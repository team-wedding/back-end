const attendanceRepository = require("../repositories/attendanceRepository");
// const authUtil = require("../utils/authUtil");

// 1. 전체 참석 정보 조회
const getAllAttendances = async () => {
  try {
    return await attendanceRepository.findAllAttendances();
  } catch (err) {
    throw new Error("Error occurred while bring all attendance data", err);
  }
};

// 2. 개인 참석 정보 조회
const getMyAttendance = async (id) => {
  try {
    return await attendanceRepository.findAllAttendances(id);
  } catch (err) {
    throw new Error(
      "Error occurred while bring individual attendance data",
      err
    );
  }
};

// 3. 개인 참석 정보 등록
const postMyAttendance = async (attendanceData) => {
  try {
    return await attendanceRepository.createAttendance(attendanceData);
  } catch (err) {
    throw new Error(
      "Error occurred while posting individual attendance data",
      err
    );
  }
};

// 4. 개인 참석 정보 삭제
const deleteMyAttendance = async (id, name, contact) => {
  try {
    return await attendanceRepository.deleteAttendance(name, contact);
  } catch (err) {
    throw new Error(
      "Error occurred while deleting individual attendance data",
      err
    );
  }
};

module.exports = {
  getAllAttendances,
  getMyAttendance,
  postMyAttendance,
  deleteMyAttendance,
};
