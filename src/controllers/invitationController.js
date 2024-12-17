const { StatusCodes } = require("http-status-codes");
const invitationService = require('../services/invitationService');

const postInvitation = async (req, res) => {
    try {
        const invitationData = req.body; // 요청 본문에서 청첩장 데이터를 추출
        const userInfo = req.userInfo; // 토큰에서 사용자 정보 추출
        const result = await invitationService.createInvitation(userInfo.id, invitationData);

        if (result) {
            return res.status(StatusCodes.CREATED).json({ 
                message: '청첩장이 생성되었습니다.'
            });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ 
            message: '청첩장 생성 실패.' 
        });
        
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            message: '서버 에러' 
        });
    }
};
 

const getInvitation = async (req, res) => {
    try {
        const invitationId = req.params.id;
        const invitation = await invitationService.getInvitationById(invitationId);
    
        if (invitation) {
          return res.status(StatusCodes.OK).json(invitation);
        }
        return res.status(StatusCodes.NOT_FOUND).json({ message: '청첩장을 찾을 수 없습니다.' });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
    }
};

const putInvitation = async (req, res) => {
    try {
        const invitationId = req.params.id;
        const userInfo = req.userInfo;
        const updatedData = req.body;
    
        const isUpdated = await invitationService.updateInvitation(invitationId, userInfo.id, updatedData);
    
        if (isUpdated) {
          return res.status(StatusCodes.OK).json({ message: '청첩장이 수정되었습니다.' });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ message: '청첩장 수정 실패.' });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
    }
};

const deleteInvitation = async (req, res) => {
    try {
        const invitationId = req.params.id;
        const userInfo = req.userInfo;
    
        const isDeleted = await invitationService.deleteInvitation(invitationId, userInfo.id);
    
        if (isDeleted) {
          return res.status(StatusCodes.OK).json({ message: '청첩장이 삭제되었습니다.' });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ message: '청첩장 삭제 실패.' });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
    }
};

const getInvitations = async (req, res) => {
    try {
        const userInfo = req.userInfo;
        const invitations = await invitationService.getInvitationsByUserId(userInfo.id);
    
        if (invitations && invitations.length > 0) {
          return res.status(StatusCodes.OK).json(invitations);
        }
        return res.status(StatusCodes.NOT_FOUND).json({ message: '청첩장을 찾을 수 없습니다.' });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
    }
};

module.exports = {
    postInvitation,
    getInvitation,
    putInvitation,
    deleteInvitation,
    getInvitations
};