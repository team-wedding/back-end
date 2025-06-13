import express, { Request, Response, Router } from "express";

const router: Router = express.Router();
import {
  getAllCelebrationMsgs,
  getMyCelebrationMsg,
  postMyCelebrationMsg,
  putMyCelebrationMsg,
  deleteMyCelebrationMsg,
  deleteCelebrationMsgByAdmin,
  getAllCelebrationMsgsForGuest,
} from "../controllers/celebrationMsgController";
import { authToken } from "../middlewares/authToken";

/**
 * @openapi
 * /api/celebrationMsgs:
 *   get:
 *     summary: 전체 축하 메시지 조회
 *     tags: [CelebrationMsgs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 전체 축하 메시지 반환
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 에러
 *   post:
 *     summary: 개인 축하 메시지 등록
 *     tags: [CelebrationMsgs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 개인 축하 메시지 등록 성공
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 에러
 *
 * /api/celebrationMsgs/guest/{id}:
 *   get:
 *     summary: 전체 축하 메시지 조회[하객용]
 *     tags: [CelebrationMsgs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 유저 ID
 *     responses:
 *       200:
 *         description: 하객용 전체 메시지 반환
 *       500:
 *         description: 서버 에러
 *
 * /api/celebrationMsgs/{id}:
 *   get:
 *     summary: 개인 축하 메시지 조회
 *     tags: [CelebrationMsgs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - password
 *               properties:
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       200:
 *         description: 개인 축하 메시지 반환
 *       404:
 *         description: 작성된 축하 메세지 없음
 *       500:
 *         description: 서버 에러
 *
 *   put:
 *     summary: 축하 메시지 수정
 *     tags: [CelebrationMsgs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - content
 *               - imageUrl
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: 개인 축하 메세지 수정 성공
 *       404:
 *         description: 작성된 축하 메세지 없거나 이름 및 비밀번호 불일치
 *       500:
 *         description: 서버 에러
 *   delete:
 *     summary: 축하 메시지 삭제
 *     tags: [CelebrationMsgs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 개인 축하 메세지 삭제 성공
 *       404:
 *         description: 작성된 축하 메세지 없음
 *       500:
 *         description: 서버 에러
 *
 * /api/celebrationMsgs/admin/{id}:
 *   delete:
 *     summary: 축하 메시지 관리자 삭제
 *     tags: [CelebrationMsgs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 관리자 축하 메세지 삭제 성공
 *       404:
 *         description: 작성된 축하메세지 없음
 *       500:
 *         description: 서버 에러
 *
 */

// 1. 전체 축하메세지 조회
router.get("/", authToken, getAllCelebrationMsgs);

//1-2. 전체 축하메세지 조회(하객용)
router.get("/guest/:id", getAllCelebrationMsgsForGuest);

// 2. 개인 축하메세지 조회
router.get("/:id", getMyCelebrationMsg);

// 3. 개인 축하메세지 등록
router.post("/", postMyCelebrationMsg);

// 4. 개인 축하메세지 수정
router.put("/:id", putMyCelebrationMsg);

// 5. 개인 축하메세지 삭제
router.delete("/:id", deleteMyCelebrationMsg);

// 6. 개인 축하메세지 어드민 삭제
router.delete("/admin/:id", authToken, deleteCelebrationMsgByAdmin);

export default router;
