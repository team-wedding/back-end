const invitationRepository = require('../repositories/invitationRepository');

const createInvitation = async (userId, invitationData) => {
    try {
        const newInvitation = await invitationRepository.createInvitation({...invitationData, userId});
        return { id: newInvitation.id };
    } catch (err) {
        throw new Error('invitationService postInvitation Err', err);
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
        throw new Error('invitationService getInvitation Err', err);
    }
};

const updateInvitation = async (userId, invitationId, updatedData) => {
    try {
        const invitation = await invitationRepository.getInvitationById(invitationId);
        if (!invitation || invitation.userId !== userId) {
            return false;
        }
        const isUpdated = await invitationRepository.updateInvitation(invitationId, updatedData);
        return isUpdated;
    } catch (err) {
        throw new Error('invitationService putInvitation Err', err);
    }
};

const deleteInvitation = async (userId, invitationId) => {
    try {
        const invitation = await invitationRepository.getInvitationById(invitationId);
        if (!invitation || invitation.userId !== userId) {
            return false;
        }
        const isDeleted = await invitationRepository.deleteInvitation(invitationId);
        return isDeleted;
    } catch (err) {
        throw new Error('invitationService deleteInvitation Err', err);
    }
};

const getInvitationsByUserId = async (userId) => {
    try {
        const invitations = await invitationRepository.getInvitationsByUserId(userId);
        return invitations || [];
    } catch (err) {
        throw new Error('invitationService getInvitations Err', err);
    }
};

module.exports = {
    createInvitation,
    getInvitationById,
    updateInvitation,
    deleteInvitation,
    getInvitationsByUserId,
};
