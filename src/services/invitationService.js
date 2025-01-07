const invitationRepository = require('../repositories/invitationRepository');

const createInvitation = async (userId, invitationData) => {
    try {
        const newInvitation = await invitationRepository.createInvitation({...invitationData, userId});
        return { id: newInvitation.id };
    } catch (err) {
        throw new Error('청첩장 등록 에러', err);
    }
};

const getInvitationById = async (invitationId) => {
    try {
        const invitation = await invitationRepository.getInvitationById(invitationId);
        if (!invitation) {
            return null;
        }
        return invitation;
    } catch (err) {
        throw new Error('청첩장 조회 에러', err);
    }
};

const updateInvitation = async (userId, invitationId, updatedData) => {
    try {
        const invitation = await invitationRepository.getInvitationById(invitationId);
        if (!invitation) {
            throw new Error('해당 청첩장이 없습니다');
        }

        if (invitation.userId !== userId) {
            throw new Error('토큰이 없어 수정할 수 없습니다');
        }

        const isUpdated = await invitationRepository.updateInvitation(invitationId, updatedData);

        return isUpdated;
    } catch (err) {
        console.error('청첩장 수정 에러:', err.message);
        throw new Error('청첩장 수정 에러');
    }
};

const deleteInvitation = async (userId, invitationId) => {
    try {
        const invitation = await invitationRepository.getInvitationById(invitationId);
        if (!invitation) {
            throw new Error('해당 청첩장이 없습니다');
        }

        if (invitation.userId !== userId) {
            throw new Error('토큰이 없어 수정할 수 없습니다');
        }

        const isDeleted = await invitationRepository.deleteInvitation(invitationId);
        return isDeleted;
    } catch (err) {
        throw new Error('청첩장 삭제 에러', err);
    }
};

const getInvitationsByUserId = async (userId) => {
    try {
        const invitations = await invitationRepository.getInvitationsByUserId(userId);
        return invitations || [];
    } catch (err) {
        throw new Error('청첩장 조회 에러', err);
    }
};

module.exports = {
    createInvitation,
    getInvitationById,
    updateInvitation,
    deleteInvitation,
    getInvitationsByUserId,
};
