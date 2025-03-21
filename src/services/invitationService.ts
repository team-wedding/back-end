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

type UpdateInvitation = Partial<Omit<InvitationData, 'id' | 'userId'>>;

export const createInvitation = async ( userId: number, invitationData: Omit<InvitationData, 'userId'>, 
  calendars: CalendarData[], maps: MapData[], galleries: GalleryData[], accounts: AccountData[], contacts: ContactData[], notices: NoticeData[] ): Promise<{ id: number }> => {
  try {
    const newInvitation = await invitationRepository.createInvitation({ ...invitationData, userId });
    
    if (calendars && calendars.length > 0) { // 캘린더 정보가 들어오면 저장
      const calendarsWithInvitationId = calendars.map((calendar) => ({
        ...calendar,
        invitationId: newInvitation.id, // 생성된 초대장의 id
      }));
      await invitationRepository.createCalendar(calendarsWithInvitationId);
    }

    if (maps && maps.length > 0) { // 지도, 교통수단 정보가 들어오면 저장
      const mapsWithInvitationId = maps.map((map) => ({
        ...map,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createMap(mapsWithInvitationId);
    }

    if (galleries && galleries.length > 0) { // 갤러리 정보가 들어오면 저장
      
      if (galleries.some(gallery => (gallery.images ?? []).length > 9)) {
        throw new ClientError("갤러리의 이미지 개수는 최대 9개까지만 가능합니다.");
      }

      const galleriesWithInvitationId = galleries.map((gallery) => ({
        ...gallery,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createGallery(galleriesWithInvitationId);
    }

    if (accounts && accounts.length > 0) { // 계좌 정보가 들어오면 저장
      const accountsWithInvitationId = accounts.map((account) => ({
        ...account,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createAccount(accountsWithInvitationId);
    }

    if (contacts && contacts.length > 0) { // 연락처 정보가 들어오면 저장
      const contactsWithInvitationId = contacts.map((contact) => ({
        ...contact,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createContact(contactsWithInvitationId);
    }

    if (notices && notices.length > 0) { // 공지사항 정보가 들어오면 저장
      const noticesWithInvitationId = notices.map((notice) => ({
        ...notice,
        invitationId: newInvitation.id,
      }))
      await invitationRepository.createNotice(noticesWithInvitationId);
    }

    return { id: newInvitation.id };

  } catch (err: unknown) {
    console.error('청첩장 등록 에러:', (err as Error).message);

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
