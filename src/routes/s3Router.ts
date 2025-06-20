import express from 'express';
import { postImage, deleteInvitationImageById, deleteCelebrationMsgImageById } from '../controllers/s3Controller';
import { imageUploader } from '../utils/s3';

/**
 * @openapi
 * /api/s3/?directory="":
 *   post:
 *     summary: S3 이미지 등록
 *     tags: [S3]
 *     parameters:
 *       - in: query
 *         name: 업로드할 directory명을 ""에 포함
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: S3 이미지 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrls:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - https://s3.amazonaws.com/your-bucket/invitation/123457_img.jpg
 *       500:
 *         description: 이미지 업로드 오류
 * 
 *   delete:
 *     summary: S3 청첩장 이미지 삭제
 *     tags: [S3]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 청첩장 ID
 *     responses:
 *       200:
 *         description: S3 청첩장 이미지 삭제 성공
 *       400:
 *         description: 유효한 청첩장 ID가 아닙니다 / 청첩장의 대표 이미지가 존재하지 않습니다
 *       404:
 *         description: 청첩장이 존재하지 않습니다
 *       500:
 *         description: 이미지 삭제 오류
 * 
 * /api/s3/celebrationMsgs/id:
 *   delete:
 *     summary: S3 포토톡 이미지 삭제
 *     tags: [S3]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 포토톡 ID
 *     responses:
 *       200:
 *         description: S3 포토톡 이미지 삭제 성공
 *       400:
 *         description: 유효한 포토톡 ID가 아닙니다 / 삭제할 이미지가 존재하지 않습니다
 *       404:
 *         description: 축하 메시지가 존재하지 않습니다
 *       500:
 *         description: 이미지 삭제 오류
 */

const router = express.Router();

router.post('/', imageUploader.array("images"), postImage);
router.delete('/invitations/:id', deleteInvitationImageById);
router.delete('/celebrationMsgs/:id', deleteCelebrationMsgImageById);

export default router;