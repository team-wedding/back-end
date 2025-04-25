import express, { Request, Response, Router } from "express";

const router: Router = express.Router();
import {
  getAllCelebrationMsgs,
  getMyCelebrationMsg,
  postMyCelebrationMsg,
  putMyCelebrationMsg,
  deleteMyCelebrationMsg,
  deleteCelebrationMsgByAdmin,
  getAllCelebrationMsgsForGuest
} from "../controllers/celebrationMsgController";
import { authToken } from "../middlewares/authToken";

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
