import express from 'express';
import { postImage, deleteInvitationImageById, deleteCelebrationMsgImageById, updateCelebrationMsgImageById, updateInvitationImageById, updateGalleryImageById, updateNoticeImageById } from '../controllers/s3Controller';
import imageUploader from '../utils/s3';

const router = express.Router();

router.post('/', imageUploader.array("images"), postImage);
router.delete('/invitations/:id', deleteInvitationImageById);
router.delete('/celebrationMsgs/:id', deleteCelebrationMsgImageById);
router.put('/invitations/:id', imageUploader.array("images"), updateInvitationImageById);
router.put('/notices/:id', imageUploader.array("images"), updateNoticeImageById);
router.put('/galleries/:id', imageUploader.array("images"), updateGalleryImageById); // index
router.put('/celebrationMsgs/:id', imageUploader.array("images"), updateCelebrationMsgImageById); // index

export default router;