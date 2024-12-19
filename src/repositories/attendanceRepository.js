const { GuestInfo } = require("../models");

// 전체 참석 정보 조회
const findAllAttendances = async () => {
  try {
    console.log("Fetching all attendance records...");
    const result = await GuestInfo.findAll();
    console.log("All attendance records fetched:", result);
    return result;
  } catch (error) {
    console.error("Error fetching all attendance records:", error);
    throw new Error(`Failed to fetch all attendance records: ${error.message}`);
  }
};

// 개인 참석 정보 조회 - 성공
const findAttendanceById = async (id) => {
  try {
    const result = await GuestInfo.findOne({ where: { id: Number(id) } });
    if (!result) {
      console.warn(`아이디에 해당하는 참석 정보가 없습니다. 아이디값 : ${id}`);
    }
    return result;
  } catch (error) {
    console.error(
      `참석 정보를 조회하는 데에 실패하였습니다. 다시 시도하여 주십시오.`,
      error
    );
    throw new Error(
      `참석 정보를 조회하는 데에 실패하였습니다. 다시 시도하여 주십시오. ${id}: ${error.message}`
    );
  }
};

// 참석 정보 생성 - 성공
const createAttendance = async (attendanceData) => {
  try {
    const result = await GuestInfo.create({
      invitationId: attendanceData.invitationId,
      name: attendanceData.name,
      contact: attendanceData.contact,
      attendance: attendanceData.attendance ?? true, // 기본값 true
      isGroomSide: attendanceData.isGroomSide ?? false, // 기본값 false
      isBrideSide: attendanceData.isBrideSide ?? false, // 기본값 false
      companions: attendanceData.companions ?? 0, // 기본값 0
    });
    return result;
  } catch (error) {
    console.error("참석 정보를 등록하는 데에 실패하였습니다.", error);
    throw new Error(
      `참석 정보를 등록하는 데에 실패하였습니다. ${error.message}`
    );
  }
};

// // 참석 정보 삭제
// const deleteAttendance = async (name, contact) => {
//   const attendance = await GuestInfo.findOne({
//     where: { name, contact },
//   });
//   if (attendance) {
//     await GuestInfo.destroy({ where: { name, contact } });
//     return true;
//   }
//   return false;
// };

// 참석 정보 삭제 - 성공 - 리팩토링 필요
const deleteAttendance = async (name, contact) => {
  try {
    console.log(
      `Attempting to delete attendance record for name: ${name}, contact: ${contact}`
    );
    const attendance = await GuestInfo.findOne({
      where: { name, contact },
    });

    if (!attendance) {
      console.warn(
        `No attendance record found for name: ${name}, contact: ${contact}`
      );
      return false;
    }

    await GuestInfo.destroy({ where: { name, contact } });
    console.log(
      `Attendance record for name: ${name}, contact: ${contact} deleted successfully.`
    );
    return true;
  } catch (error) {
    console.error(
      `Error deleting attendance record for name: ${name}, contact: ${contact}`,
      error
    );
    throw new Error(`Failed to delete attendance record: ${error.message}`);
  }
};

module.exports = {
  findAllAttendances,
  findAttendanceById,
  createAttendance,
  deleteAttendance,
};
