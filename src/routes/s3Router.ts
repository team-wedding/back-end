import express from 'express';
import { postImage } from '../controllers/s3Controller';
import { deleteImageById } from '../controllers/s3Controller';
import imageUploader from '../utils/s3';

const router = express.Router();

router.post('/', imageUploader.array("images"), postImage);
router.delete('/:id', deleteImageById);

export default router;