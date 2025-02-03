"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const celebrationMsgController_1 = require("../controllers/celebrationMsgController");
const authToken_1 = require("../middlewares/authToken");
// 1. 전체 축하메세지 조회
router.get("/", authToken_1.authToken, celebrationMsgController_1.getAllCelebrationMsgs);
// 2. 개인 축하메세지 조회
router.get("/:id", celebrationMsgController_1.getMyCelebrationMsg);
// 3. 개인 축하메세지 등록
router.post("/", celebrationMsgController_1.postMyCelebrationMsg);
// 4. 개인 축하메세지 수정
router.put("/:id", celebrationMsgController_1.putMyCelebrationMsg);
// 4. 개인 축하메세지 삭제
router.delete("/:id", celebrationMsgController_1.deleteMyCelebrationMsg);
exports.default = router;
