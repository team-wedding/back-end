import * as invitationRepository from '../repositories/invitationRepository';
import { InvitationData } from '../interfaces/invitationData';

type UpdateInvitation = Partial<Omit<InvitationData, 'id' | 'userId'>>;

export const createInvitation = async (
  userId: number,
  invitationData: Omit<InvitationData, 'userId'>
): Promise<{ id: number }> => {
  try {
    const newInvitation = await invitationRepository.createInvitation({ ...invitationData, userId });
    return { id: newInvitation.id };
  } catch (err: unknown) {
    console.error('청첩장 등록 에러:', (err as Error).message);
    throw new Error('청첩장 등록 에러');
  }
};

export const getInvitationById = async (
  invitationId: number
): Promise<InvitationData | null> => {
  try {
    const invitation = await invitationRepository.getInvitationById(invitationId);
    return invitation || null;
  } catch (err: unknown) {
    console.error('청첩장 조회 에러:', (err as Error).message);
    throw new Error('청첩장 조회 에러');
  }
};

export const updateInvitation = async (
  userId: number,
  invitationId: number,
  updatedData: UpdateInvitation
): Promise<boolean> => {
  try {
    const invitation = await invitationRepository.getInvitationById(invitationId);
    if (!invitation) {
      throw new Error('해당 청첩장이 없습니다');
    }

    if (invitation.userId !== userId) {
      throw new Error('권한이 없어 수정할 수 없습니다');
    }

    const isUpdated = await invitationRepository.updateInvitation(invitationId, updatedData);
    return isUpdated;
  } catch (err: unknown) {
    console.error('청첩장 수정 에러:', (err as Error).message);
    throw new Error('청첩장 수정 에러');
  }
};

export const deleteInvitation = async (
  userId: number,
  invitationId: number
): Promise<boolean> => {
  try {
    const invitation = await invitationRepository.getInvitationById(invitationId);
    if (!invitation) {
      throw new Error('해당 청첩장이 없습니다');
    }

    if (invitation.userId !== userId) {
      throw new Error('권한이 없어 삭제할 수 없습니다');
    }

    const isDeleted = await invitationRepository.deleteInvitation(invitationId);
    return isDeleted;
  } catch (err: unknown) {
    console.error('청첩장 삭제 에러:', (err as Error).message);
    throw new Error('청첩장 삭제 에러');
  }
};

export const getInvitationsByUserId = async (
  userId: number
): Promise<InvitationData[]> => {
  try {
    const invitations = await invitationRepository.getInvitationsByUserId(userId);
    return invitations || [];
  } catch (err: unknown) {
    console.error('청첩장 조회 에러:', (err as Error).message);
    throw new Error('청첩장 조회 에러');
  }
};
