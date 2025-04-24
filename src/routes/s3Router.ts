import express from 'express';
import { postImage, deleteInvitationImageById, deleteCelebrationMsgImageById, updateCelebrationMsgImageById, updateInvitationImageById, updateGalleryImageById, updateNoticeImageById } from '../controllers/s3Controller';
import imageUploader from '../utils/s3';

const router = express.Router();

router.post('/', imageUploader.array("images"), postImage);
router.delete('/invitations/:id', deleteInvitationImageById);
router.delete('/celebrationMsgs/:id', deleteCelebrationMsgImageById);
router.put('/invitations/:id', updateInvitationImageById);
router.put('/galleries/:id', updateGalleryImageById); // index
router.put('/notices/:id', updateNoticeImageById);
router.put('/celebrationMsgs/:id', updateCelebrationMsgImageById); // index

export default router;