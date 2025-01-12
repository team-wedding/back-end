import db from '../models';
import { InvitationData } from '../interfaces/invitation.interface';

export const createInvitation = async (invitationData: InvitationData) => {
  try {
    return await db.Invitation.create(invitationData);  // db.Invitation으로 접근
  } catch (err) {
    throw new Error(`청첩장 등록 에러: ${(err as Error).message}`);
  }
};

export const getInvitationById = async (invitationId: number) => {
  try {
    return await db.Invitation.findOne({
      where: { id: invitationId },
      raw: true,
    });
  } catch (err) {
    throw new Error(`청첩장 조회 에러: ${(err as Error).message}`);
  }
};

export const getInvitationsByUserId = async (userId: number) => {
  try {
    return await db.Invitation.findAll({
      where: { userId },
      raw: true,
    });
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