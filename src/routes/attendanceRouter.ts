import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import {
  getAllAttendances,
  getMyAttendance,
  postMyAttendance,
  deleteMyAttendance,
} from "../controllers/attendanceController";
import { authToken } from "../middlewares/authToken";

interface Params {
  id: string;
  [key: string]: string;
}

/**
 * @openapi
 * /api/attendances:
 *   get:
 *     summary: 전체 참석 여부 조회
 *     tags : [Attendances]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 전체 참석 정보 반환
 *       404:
 *         description: 전체 참석 정보 찾을 수 없음
 *       500:
 *         description: 서버 에러
 *   post:
 *     summary: 개인 참석 여부 등록
 *     tags : [Attendances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "123"
 *               isAttending:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: 개인 참석 정보 등록 성공
 *       500:
 *         description: 서버 에러
 *
 * /api/attendances/{id}:
 *   get:
 *     summary: 개인 참석 여부 조회
 *     tags : [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 개인 참석 정보 반환
 *       404:
 *         description: 개인 참석 여부 찾을 수 없음
 *       500:
 *         description: 서버 에러
 *
 *   delete:
 *     summary: 개인 참석 여부 삭제
 *     tags : [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 개인 참석 정보 삭제 성공
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 에러
 */

// 1. 전체 참석 여부 조회
router.get("/", authToken, getAllAttendances);

// 2. 개인 참석 여부 조회
router.get("/:id", (req: Request<Params & { id: number }>, res: Response) => {
  getMyAttendance(req, res);
});

// 3. 개인 참석 여부 등록
router.post("/", postMyAttendance);

// 4. 개인 참석 여부 삭제 ->??????????????????????????????????????수정필요 id 없애도 되려나 -> 없애도 되면 삭제시 문제해결
router.delete(
  "/:id",
  (req: Request<Params & { id: number }>, res: Response) => {
    deleteMyAttendance(req, res);
  }
);

export default router;
