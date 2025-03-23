import express from 'express';
import { postImage } from '../controllers/S3Controller';
import imageUploader from '../utils/s3';

const router = express.Router();

router.post('/', imageUploader.array("images"), postImage);

export default router;