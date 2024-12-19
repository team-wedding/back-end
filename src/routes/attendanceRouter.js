const express = require("express");
const router = express.Router();
const {
  getAllAttendances,
  getMyAttendance,
  postMyAttendance,
  deleteMyAttendance,
} = require("../controllers/attendanceController");
const { authToken } = require("../middlewares/authToken");

// 1. 전체 참석 여부 조회
router.get("/", authToken, getAllAttendances);

// 2. 개인 참석 여부 조회
router.get("/:id", getMyAttendance);

// 3. 개인 참석 여부 등록
router.post("/", postMyAttendance);

// 4. 개인 참석 여부 삭제
router.delete("/:id", deleteMyAttendance);

module.exports = router;
