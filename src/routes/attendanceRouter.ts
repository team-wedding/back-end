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

// 1. 전체 참석 여부 조회
router.get("/", authToken, getAllAttendances);

// 2. 개인 참석 여부 조회
router.get("/:id", (req: Request<Params & { id: number }>, res: Response) => {
  getMyAttendance(req, res);
});

// 3. 개인 참석 여부 등록
router.post("/", postMyAttendance);

// 4. 개인 참석 여부 삭제
router.delete(
  "/:id",
  (req: Request<Params & { id: number }>, res: Response) => {
    deleteMyAttendance(req, res);
  }
);

export default router;
