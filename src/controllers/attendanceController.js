const { StatusCodes } = require("http-status-codes");
const attendanceService = require("../services/attendanceService");

// 1. 전체 참석 정보 조회
const getAllAttendances = async (req, res) => {
  try {
    const allAttendances = await attendanceService.getAllAttendances();
    res.status(StatusCodes.OK).json(allAttendances);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 2. 개인 참석 정보 조회
const getMyAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await attendanceService.getMyAttendance(id);
    if (attendance) {
      res.status(StatusCodes.OK).json(attendance);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "참석 정보가 없습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 3. 개인 참석 정보 등록
const postMyAttendance = async (req, res) => {
  const { invitationId, name, contact, companions, isGroomSide, isBrideSide } =
    req.body;

  try {
    await attendanceService.postMyAttendance({
      invitationId,
      name,
      contact,
      companions,
      isGroomSide,
      isBrideSide,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "결혼식 참석 여부가 [참석]으로 등록되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 4. 개인 참석 정보 삭제
const deleteMyAttendance = async (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;

  try {
    const result = await attendanceService.deleteMyAttendance(
      id,
      name,
      contact
    );
    if (result) {
      res
        .status(StatusCodes.OK)
        .json({ message: "참석 여부가 [불참]으로 변경되었습니다." });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "참석 정보가 없거나 정보가 일치하지 않습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

module.exports = {
  getAllAttendances,
  getMyAttendance,
  postMyAttendance,
  deleteMyAttendance,
};
