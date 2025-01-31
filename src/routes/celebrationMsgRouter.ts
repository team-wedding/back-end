import express, { Request, Response, Router } from "express";
import imageUploader from "../middlewares/imageUploader";

const router: Router = express.Router();
import {
  getAllCelebrationMsgs,
  getMyCelebrationMsg,
  postMyCelebrationMsg,
  putMyCelebrationMsg,
  deleteMyCelebrationMsg,
} from "../controllers/celebrationMsgController";
import { authToken } from "../middlewares/authToken";

// 1. 전체 축하메세지 조회
router.get("/", authToken, getAllCelebrationMsgs);

// 2. 개인 축하메세지 조회
router.get("/:id", getMyCelebrationMsg);

// 3. 개인 축하메세지 등록
router.post("/", imageUploader.array("image"), postMyCelebrationMsg);

// 4. 개인 축하메세지 수정
router.put("/:id", putMyCelebrationMsg);

// 4. 개인 축하메세지 삭제
router.delete("/:id", deleteMyCelebrationMsg);

export default router;
