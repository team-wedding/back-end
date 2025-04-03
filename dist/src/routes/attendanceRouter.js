"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const attendanceController_1 = require("../controllers/attendanceController");
const authToken_1 = require("../middlewares/authToken");
// 1. 전체 참석 여부 조회
router.get("/", authToken_1.authToken, attendanceController_1.getAllAttendances);
// 2. 개인 참석 여부 조회
router.get("/:id", (req, res) => {
    (0, attendanceController_1.getMyAttendance)(req, res);
});
// 3. 개인 참석 여부 등록
router.post("/", attendanceController_1.postMyAttendance);
// 4. 개인 참석 여부 삭제 ->??????????????????????????????????????수정필요 id 없애도 되려나 -> 없애도 되면 삭제시 문제해결
router.delete("/:id", (req, res) => {
    (0, attendanceController_1.deleteMyAttendance)(req, res);
});
exports.default = router;
