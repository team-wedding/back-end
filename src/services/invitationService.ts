import * as invitationRepository from '../repositories/invitationRepository';
import { InvitationData } from '../interfaces/invitation.interface';
import { CalendarData } from '../interfaces/calendar.interface';
import { MapData } from '../interfaces/map.interface';
import { GalleryData } from '../interfaces/gallery.interface';
import { AccountData } from '../interfaces/account.interface';
import { ContactData } from '../interfaces/contact.interface';
import { NoticeData } from '../interfaces/notice.interface';
import { ClientError, ValidationError } from '../utils/error';
import Invitation from '../models/invitation';
import db from '../models'
import { deleteImageFromS3, extractS3KeyFromUrl } from '../utils/s3';

type UpdateInvitation = Partial<Omit<InvitationData, 'id' | 'userId'>>;

export const createInvitation = async ( userId: number, invitationData: Omit<InvitationData, 'userId'>, 
  calendars: CalendarData[], maps: MapData[], galleries: GalleryData[], accounts: AccountData[], contacts: ContactData[], notices: NoticeData[] ): Promise<{ id: number }> => {
    const transaction = await db.sequelize.transaction();
  
    try {
    const newInvitation = await invitationRepository.createInvitation({ ...invitationData, userId }, transaction);
    
    if (calendars && calendars.length > 0) { // 캘린더 정보가 들어오면 저장
      const calendarsWithInvitationId = calendars.map((calendar) => ({
        ...calendar,
        invitationId: newInvitation.id, // 생성된 초대장의 id
      }));
      await invitationRepository.createCalendar(calendarsWithInvitationId, transaction);
    }

    if (maps && maps.length > 0) { // 지도, 교통수단 정보가 들어오면 저장
      const mapsWithInvitationId = maps.map((map) => ({
        ...map,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createMap(mapsWithInvitationId, transaction);
    }

    if (galleries && galleries.length > 0) { // 갤러리 정보가 들어오면 저장
      
      if (galleries.some(gallery => (gallery.images ?? []).length > 9)) {
        throw new ClientError("갤러리의 이미지 개수는 최대 9개까지만 가능합니다.");
      }

      const galleriesWithInvitationId = galleries.map((gallery) => ({
        ...gallery,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createGallery(galleriesWithInvitationId, transaction);
    }

    if (accounts && accounts.length > 0) { // 계좌 정보가 들어오면 저장
      const accountsWithInvitationId = accounts.map((account) => ({
        ...account,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createAccount(accountsWithInvitationId, transaction);
    }

    if (contacts && contacts.length > 0) { // 연락처 정보가 들어오면 저장
      const contactsWithInvitationId = contacts.map((contact) => ({
        ...contact,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createContact(contactsWithInvitationId, transaction);
    }

    if (notices && notices.length > 0) { // 공지사항 정보가 들어오면 저장
      const noticesWithInvitationId = notices.map((notice) => ({
        ...notice,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createNotice(noticesWithInvitationId, transaction);
    }

    await transaction.commit();

    return { id: newInvitation.id };

  } catch (err) {

    if(transaction) {
      await transaction.rollback();
      console.error('청첩장 등록 에러:', (err as Error).message);
    }

    if (err instanceof ClientError) { // ClientError의 경우 따로 처리
      throw err;

    }

    throw new Error('청첩장 등록 에러');
  }
};

export const getInvitationById = async ( invitationId: number ): Promise<InvitationData | null> => {
  try {
    const invitation = await invitationRepository.getInvitationById(invitationId);
    return invitation || null;
  } catch (err: unknown) {
    console.error('청첩장 조회 에러:', (err as Error).message);
    throw new Error('청첩장 조회 에러');
  }
};

export const updateInvitation = async ( userId: number, invitationId: number, updatedData: UpdateInvitation,
  calendars: CalendarData[], maps: MapData[], galleries: GalleryData[], accounts: AccountData[], contacts: ContactData[], notices: NoticeData[]
 ): Promise<boolean> => {
  try {
    const invitation = await invitationRepository.getInvitationById(invitationId);

    // 필드 체크
    const attributes = Invitation.getAttributes() as Record<string, any>;
    const requiredFields = Object.keys(attributes).filter((field) => attributes[field].allowNull === true);
    const missingFields = requiredFields.filter(field => !(field in updatedData));

    if(missingFields.length > 0) {
      throw new ValidationError(`청첩장 필수 값이 누락되었습니다: ${missingFields.join(', ')}`);
    };

    if (!invitation) {
      throw new Error('해당 청첩장이 없습니다');
    }

    if (invitation.userId !== userId) {
      throw new Error('권한이 없어 수정할 수 없습니다');
    }
    
    // db에서 조회 후 이미지 삭제
    // 1: 대표이미지
    if(invitation.imgUrl && invitation.imgUrl !== updatedData.imgUrl) {
      const prevKey = extractS3KeyFromUrl(invitation.imgUrl);
      if(prevKey) {
        try {
          await deleteImageFromS3(prevKey);
          console.log("대표 이미지 삭제 성공:", prevKey);
        } catch (err) {
          console.warn("대표 이미지 삭제 실패:", prevKey, (err as Error).message);
        }
      }
    }

    // 2: 갤러리 이미지
    if (invitation.galleries && Array.isArray(galleries)) {
      const prevGalleryUrls: string[] = [];

      // DB에서 꺼낸 이전 이미지 URL 리스트 추출
      invitation.galleries.forEach((gallery: any) => {
        if (typeof gallery.images === "string") {
          try {
            const parsed = JSON.parse(gallery.images);
            if (Array.isArray(parsed)) {
              prevGalleryUrls.push(...parsed);
            }
          } catch (err) {
            console.warn("DB 갤러리 images 파싱 실패:", gallery.images);
          }
        } else if (Array.isArray(gallery.images)) {
          // 혹시 sequelize에서 배열로 나오는 경우
          prevGalleryUrls.push(...gallery.images);
          }
      });

      // 프론트에서 전달받은 최신 이미지 URL 리스트 추출
      const updatedGalleryUrls: string[] = [];

      galleries.forEach((gallery: any) => {
        if (Array.isArray(gallery.images)) {
          updatedGalleryUrls.push(...gallery.images);
        }
      });

      // 삭제 대상 이미지 URL 계산
      const deletedGalleryUrls = prevGalleryUrls.filter(
        (prevUrl) => !updatedGalleryUrls.includes(prevUrl)
      );

      // 삭제 실행
      for (const url of deletedGalleryUrls) {
        const key = extractS3KeyFromUrl(url);
        if (key) {
         try {
          await deleteImageFromS3(key);
          console.log("갤러리 이미지 삭제 성공:", key);
          } catch (err) {
            console.error("갤러리 이미지 삭제 실패:", key, (err as Error).message);
          }
        } else {
          console.warn("S3 key 추출 실패 (갤러리):", url);
        }
      }
    }

    // 3: 공지사항 이미지
    if (invitation.notices && notices) {
      const prevNoticeUrls = invitation.notices.map((n: any) => n.image);
      const updatedNoticeUrls = notices.map((n: any) => n.image);

      const deletedNoticeUrls = prevNoticeUrls.filter((url: string) => !updatedNoticeUrls.includes(url));
      for (const url of deletedNoticeUrls) {
        const key = extractS3KeyFromUrl(url);
        if (key) {
          try {
            await deleteImageFromS3(key);
            console.log("공지사항 이미지 삭제 성공:", key);
          } catch (err) {
            console.warn("공지사항 이미지 삭제 실패:", key, (err as Error).message);
          }
        }
      }
    }

    let isUpdated = false;
    const invitationUpdated = await invitationRepository.updateInvitation(invitationId, updatedData);

    if (invitationUpdated) {
      isUpdated = true;
    }
    
    if (calendars && calendars.length > 0 ) {
      const updatedCalendars = await invitationRepository.updateCalendar(invitationId, calendars);

      if (updatedCalendars){
        isUpdated = true;
      }
    }

    if (maps && maps.length > 0 ) {
      const updatedMaps = await invitationRepository.updateMap(invitationId, maps);

      if (updatedMaps){
        isUpdated = true;
      }
    }

    if (galleries && galleries.length > 0 ) {
      const updatedGalleries = await invitationRepository.updateGallery(invitationId, galleries);

      if (updatedGalleries){
        isUpdated = true;
      }
    }

    if (accounts && accounts.length > 0 ) {
      const updatedAccounts = await invitationRepository.updateAccount(invitationId, accounts);

      if (updatedAccounts){
        isUpdated = true;
      }
    }

    if (contacts && contacts.length > 0 ) {
      const updatedContacts = await invitationRepository.updateContact(invitationId, contacts);

      if (updatedContacts){
        isUpdated = true;
      }
    }

    if (notices && notices.length > 0 ) {
      const updatedNotices = await invitationRepository.updateNotice(invitationId, notices);

      if (updatedNotices){
        isUpdated = true;
      }
    }
    
    return isUpdated;
  } catch (err: unknown) {
    if (err instanceof ValidationError) { 
      throw err;
    }
    console.error('청첩장 수정 에러:', (err as Error).message);
    throw new Error('청첩장 수정 에러');
  }
};

export const deleteInvitation = async ( userId: number, invitationId: number ): Promise<boolean> => {
  try {
    const invitation = await invitationRepository.getInvitationById(invitationId);
    if (!invitation) {
      throw new Error('해당 청첩장이 없습니다');
    }

    if (invitation.userId !== userId) {
      throw new Error('권한이 없어 삭제할 수 없습니다');
    }

   const isCalendarDeleted = await invitationRepository.deleteCalendar(invitationId);
   const isMapDeleted = await invitationRepository.deleteMap(invitationId);
   const isAccountDeleted = await invitationRepository.deleteAccount(invitationId);
   const isContactDeleted = await invitationRepository.deleteContact(invitationId);
   const isGalleryDeleted = await invitationRepository.deleteGallery(invitationId);
   const isNoticeDeleted = await invitationRepository.deleteNotice(invitationId);

   if (isCalendarDeleted && isAccountDeleted && isContactDeleted && isGalleryDeleted && isMapDeleted && isNoticeDeleted) {
    const isInvitationDeleted = await invitationRepository.deleteInvitation(invitationId);
    return isInvitationDeleted;
   }

    return false;
  } catch (err: unknown) {
    console.error('청첩장 삭제 에러:', (err as Error).message);
    throw new Error('청첩장 삭제 에러');
  }
};

export const getInvitationsByUserId = async ( userId: number ): Promise<InvitationData[]> => {
  try {
    const invitations = await invitationRepository.getInvitationsByUserId(userId);
    return invitations || [];
  } catch (err: unknown) {
    console.error('청첩장 조회 에러:', (err as Error).message);
    throw new Error('청첩장 조회 에러');
  }
};


export const getInvitationWithCredential = async (
  req: RequestType<typeof invitationRepository.getInvitationWithCredential>
): Promise<InvitationData | null> => {
  try {
    const invitation = await invitationRepository.getInvitationWithCredential(
      req
    );
    return invitation || null;
  } catch (err: unknown) {
    if (err instanceof Error) console.error("청첩장 조회 에러:", err.message);
    throw new Error("청첩장 조회 에러");
  }
};