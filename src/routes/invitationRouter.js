const express = require('express');
const router = express.Router();
const { postInvitation, getInvitation, putInvitation, deleteInvitation, getInvitations } = require('../controllers/invitationController');
const { authToken } = require('../middlewares/authToken');

router.post('/', authToken, postInvitation);
router.get('/:id', getInvitation); // 특정 청첩장 조회(받는 사람 입장), 토큰 필요 x
router.put('/:id', authToken, putInvitation);
router.delete('/:id', authToken, deleteInvitation);
router.get('/', authToken, getInvitations); // 특정 유저의 청첩장들 조회(만든 사람 입장)

module.exports = router;