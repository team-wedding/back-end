const { Invitation } = require('../models');

const createInvitation = async (invitationData) => {
  try {
    const newInvitation = await Invitation.create({
      userId: invitationData.userId,
      groomName: invitationData.groomName,
      brideName: invitationData.brideName,
      groomContact: invitationData.groomContact,
      brideContact: invitationData.brideContact,
      date: invitationData.date,
      location: invitationData.location,
      imgUrl: invitationData.imgUrl,
      contentType: invitationData.contentType,
      content: invitationData.content,
      groomFatherName: invitationData.groomFatherName,
      groomMotherName: invitationData.groomMotherName,
      brideFatherName: invitationData.brideFatherName,
      brideMotherName: invitationData.brideMotherName,
      groomFatherContact: invitationData.groomFatherContact,
      groomMotherContact: invitationData.groomMotherContact,
      brideFatherContact: invitationData.brideFatherContact,
      brideMotherContact: invitationData.brideMotherContact,
      weddingTime: invitationData.weddingTime,
      groomFatherAlive: invitationData.groomFatherAlive,
      groomMotherAlive: invitationData.groomMotherAlive,
      brideFatherAlive: invitationData.brideFatherAlive,
      brideMotherAlive: invitationData.brideMotherAlive,
      font: invitationData.font,
      weight: invitationData.weight,
      backgroundColor: invitationData.backgroundColor
    });
    return newInvitation;
  } catch (err) {
    throw new Error('invitationRepository createInvitation err', err);
  }
};

const getInvitationById = async (invitationId) => {
  try {
    const invitation = await Invitation.findOne({
      where: { id: invitationId },
      raw: true,
    });
    return invitation;
  } catch (err) {
    throw new Error('invitationRepository getInvitationById err', err);
  }
};

const getInvitationsByUserId = async (userId) => {
  try {
    const invitations = await Invitation.findAll({
      where: { userId: userId },
      raw: true,
    });
    return invitations;
  } catch (err) {
    throw new Error('invitationRepository getInvitationsByUserId err', err);
  }
};

const updateInvitation = async (invitationId, updatedData) => {
  try {
    await Invitation.update(updatedData, {
      where: { id: invitationId },
    });
    return true;
  } catch (err) {
    throw new Error('invitationRepository updateInvitation err', err);
  }
};

const deleteInvitation = async (invitationId) => {
  try {
    await Invitation.destroy({
      where: { id: invitationId },
    });
    return true;
  } catch (err) {
    throw new Error('invitationRepository deleteInvitation err', err);
  }
};

module.exports = {
  createInvitation,
  getInvitationById,
  getInvitationsByUserId,
  updateInvitation,
  deleteInvitation,
};
