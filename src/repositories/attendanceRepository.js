const { GuestInfo } = require("../models");

// 전체 참석 정보 조회
const findAllAttendances = async () => {
  return await GuestInfo.findAll();
};

// 개인 참석 정보 조회
const findAttendanceById = async (id) => {
  return await GuestInfo.findOne({ where: { id } });
};

// 참석 정보 생성
const createAttendance = async (attendanceData) => {
  return await GuestInfo.create({
    invitationId: attendanceData.invitationId,
    name: attendanceData.name,
    contact: attendanceData.contact,
    attendance: attendanceData.attendance || true, // 기본값 true
    isGroomSide: attendanceData.isGroomSide,
    isBrideSide: attendanceData.isBrideSide,
    companions: attendanceData.companions || 0,
  });
};

// 참석 정보 삭제
const deleteAttendance = async (name, contact) => {
  const attendance = await GuestInfo.findOne({
    where: { name, contact },
  });
  if (attendance) {
    await GuestInfo.destroy({ where: { name, contact } });
    return true;
  }
  return false;
};

module.exports = {
  findAllAttendances,
  findAttendanceById,
  createAttendance,
  deleteAttendance,
};
