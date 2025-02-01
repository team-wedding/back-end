import express from 'express';
import { postImage } from '../controllers/imageUploadController';
import imageUploader from '../utils/imageUploader';

const router = express.Router();

router.post('/', imageUploader.array("images"), postImage);

export default router;