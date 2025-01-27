import db from '../models';
import { InvitationData } from '../interfaces/invitation.interface';
import { CalendarData } from '../interfaces/calendar.interface';
import { MapData } from '../interfaces/map.interface';
import { GalleryData } from '../interfaces/gallery.interface';
import { AccountData } from '../interfaces/account.interface';
import { ContactData } from '../interfaces/contact.interface';
import { NoticeData } from '../interfaces/notice.interface';

export const createInvitation = async (invitationData: InvitationData) => {
  try {
    return await db.Invitation.create(invitationData);  // db.Invitation으로 접근
  } catch (err) {
    throw new Error(`청첩장 등록 에러: ${(err as Error).message}`);
  }
};

export const createCalendar = async (calendars: CalendarData[]) => {
  try {
    return await db.Calendar.bulkCreate(calendars);
  } catch (err) {
    throw new Error(`캘린더 등록 에러: ${(err as Error).message}`);
  }
};

export const createMap = async (maps: MapData[]) => {
  try {
    return await db.Map.bulkCreate(maps);
  } catch (err) {
    throw new Error(`지도, 교통수단 등록 에러: ${(err as Error).message}`);
  }
}

export const createGallery = async (galleries : GalleryData[]) => {
  try {
    return await db.Gallery.bulkCreate(galleries);
  } catch (err) {
    throw new Error(`갤러리 등록 에러: ${(err as Error).message}`);
  }
}

export const createAccount = async (accounts : AccountData[]) => {
  try {
    return await db.Account.bulkCreate(accounts);
  } catch (err) {
    throw new Error(`계좌 등록 에러: ${(err as Error).message}`);
  }
}

export const createContact = async (contacts : ContactData[]) => {
  try {
    return await db.Contact.bulkCreate(contacts);
  } catch (err) {
    throw new Error(`연락처 등록 에러: ${(err as Error).message}`);
  }
}

export const createNotice = async (notices : NoticeData[]) => {
  try {
    return await db.Notice.bulkCreate(notices);
  } catch (err) {
    throw new Error(`공지사항 등록 에러: ${(err as Error).message}`);
  }
}

export const getInvitationById = async (invitationId: number) => {
  try {
    return await db.Invitation.findOne({
      where: { id: invitationId },
      include : [
        {
          model: db.Calendar,
          as: 'calendars',
          required: false,
        },
        {
          model: db.Map,
          as: 'maps',
          required: false,
        },
        {
          model: db.Gallery,
          as: 'galleries',
          required: false,
        },
        {
          model: db.Account,
          as: 'accounts',
          required: false,
        },
        {
          model: db.Contact,
          as: 'contacts',
          required: false,
        },
        {
          model: db.Notice,
          as: 'notices',
          required: false,
        },
      ],
    });
  } catch (err) {
    throw new Error(`청첩장 조회 에러: ${(err as Error).message}`);
  }
};

export const getInvitationsByUserId = async (userId: number) => {
  // userId로 먼저 테이블을 조회하고 해당 테이블의 id를 반환하여 연결된 테이블들을 join
  try { // userId로 테이블 조회
    const invitations = await db.Invitation.findAll({
      where: { userId },
      raw: true,
    });

    if (invitations && invitations.length > 0 ) { // 테이블이 있으면 invitationId로 다른 테이블들을 join
      const invitationIds = invitations.map((invitation: {id : number}) => invitation.id);
      
      return await db.Invitation.findAll({
        where : { id: invitationIds},
        include : [
          {
            model: db.GuestInfo,
            as : 'guestInfos',
            required: false,
          },
          {
            model: db.CelebrationMsg,
            as : 'celebrationMsgs',
            required: false,
          },
          {
            model: db.Calendar,
            as: 'calendars',
            required: false,
          },
          {
            model: db.Map,
            as: 'maps',
            required: false,
          },
          {
            model: db.Gallery,
            as: 'galleries',
            required: false,
          },
          {
            model: db.Account,
            as: 'accounts',
            required: false,
          },
          {
            model: db.Contact,
            as: 'contacts',
            required: false,
          },
          {
            model: db.Notice,
            as: 'notices',
            required: false,
          },
        ],
      });
    }
  } catch (err) {
    throw new Error(`사용자 청첩장 조회 에러: ${(err as Error).message}`);
  }
};

export const updateInvitation = async (invitationId: number, updatedData: Partial<InvitationData>) => {
  try {
    const [affectedRows] = await db.Invitation.update(updatedData, {
      where: { id: invitationId },
    });
    return affectedRows > 0;
  } catch (err) {
    throw new Error(`청첩장 수정 에러: ${(err as Error).message}`);
  }
};

export const updateCalendar = async (invitationId: number, calendarData : CalendarData[]) => {
  try {
    await db.Calendar.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제

    const [newCalendars] = await db.Calendar.bulkCreate( // 삭제 후 다시 생성(없으면 자동 생성)
      calendarData.map((calendar) => ({
        ...calendar,
        invitationId,
      }))
    );

    return newCalendars > 0;
  } catch (err) {
    throw new Error(`캘린더 수정 에러: ${(err as Error).message}`);
  }
};

export const updateMap = async (invitationId: number, mapData : MapData[]) => {
  try {
    await db.Map.destroy({ where: { invitationId } }); // 기존 데이터 삭제

    const [newMaps] = await db.Map.bulkCreate(
      mapData.map((map) => ({
        ...map,
        invitationId,
      }))
    );

    return newMaps > 0;
  } catch (err) {
    throw new Error(`지도, 교통수단 수정 에러: ${(err as Error).message}`);
  }
};

export const updateGallery = async (invitationId: number, galleryData : GalleryData[]) => {
  try {
    await db.Gallery.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제

    const [newGalleries] = await db.Gallery.bulkCreate( // 삭제 후 다시 생성(없으면 자동 생성)
      galleryData.map((gallery) => ({
        ...gallery,
        invitationId,
      }))
    );

    return newGalleries > 0;
  } catch (err) {
    throw new Error(`갤러리 수정 에러: ${(err as Error).message}`);
  }
};

export const updateAccount = async (invitationId: number, accountData : AccountData[]) => {
  try {
    await db.Account.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제

    const [newAccounts] = await db.Account.bulkCreate( // 삭제 후 다시 생성(없으면 자동 생성)
      accountData.map((account) => ({
        ...account,
        invitationId,
      }))
    );

    return newAccounts > 0;
  } catch (err) {
    throw new Error(`계좌 수정 에러: ${(err as Error).message}`);
  }
};

export const updateContact = async (invitationId: number, contactData : ContactData[]) => {
  try {
    await db.Contact.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제

    const [newContacts] = await db.Contact.bulkCreate( // 삭제 후 다시 생성(없으면 자동 생성)
      contactData.map((contact) => ({
        ...contact,
        invitationId,
      }))
    );

    return newContacts > 0;
  } catch (err) {
    throw new Error(`연락처 수정 에러: ${(err as Error).message}`);
  }
};

export const updateNotice = async (invitationId: number, noticeData : NoticeData[]) => {
  try {
    await db.Notice.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제

    const [newNotices] = await db.Notice.bulkCreate( // 삭제 후 다시 생성(없으면 자동 생성)
      noticeData.map((notice) => ({
        ...notice,
        invitationId,
      }))
    );

    return newNotices > 0;
  } catch (err) {
    throw new Error(`공지사항 수정 에러: ${(err as Error).message}`);
  }
};

export const deleteInvitation = async (invitationId: number) => {
  try {
    await db.Invitation.destroy({
      where: { id: invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`청첩장 삭제 에러: ${(err as Error).message}`);
  }
};

export const deleteCalendar = async (invitationId: number) => {
  try {
    await db.Calendar.destroy({
      where: { invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`캘린더 삭제 에러: ${(err as Error).message}`);
  }
};

export const deleteMap = async (invitationId: number) => {
  try {
    await db.Map.destroy({
      where: { invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`지도, 교통수단 삭제 에러: ${(err as Error).message}`);
  }
};

export const deleteGallery = async (invitationId: number) => {
  try {
    await db.Gallery.destroy({
      where: { invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`갤러리 삭제 에러: ${(err as Error).message}`);
  }
};

export const deleteAccount = async (invitationId: number) => {
  try {
    await db.Account.destroy({
      where: { invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`계좌 삭제 에러: ${(err as Error).message}`);
  }
};

export const deleteContact = async (invitationId: number) => {
  try {
    await db.Contact.destroy({
      where: { invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`연락처 삭제 에러: ${(err as Error).message}`);
  }
};

export const deleteNotice = async (invitationId: number) => {
  try {
    await db.Notice.destroy({
      where: { invitationId },
    });
    return true;
  } catch (err) {
    throw new Error(`공지사항 삭제 에러: ${(err as Error).message}`);
  }
};
