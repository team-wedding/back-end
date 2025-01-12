import db from "../models";
import { attendanceData } from "../interfaces/attendance.interface";
import GuestInfo from "../models/guestInfo";

// 1. 전체 참석 정보 조회
export const findAllAttendances = async (
  invitationId: number
): Promise<GuestInfo[]> => {
  try {
    console.log("모든 참석 정보 기록을 불러오는 중입니다...");
    const result = await db.GuestInfo.findAll({
      where: { invitationId },
    });
    console.log("모든 참석 정보가 불러와졌습니다. : ", result);
    return result;
  } catch (error: any) {
    console.error(
      "모든 참석 정보 기록을 불러오는 중에 오류가 감지되었습니다.",
      error
    );
    throw new Error(
      `모든 참석 정보 기록을 불러오는 것에 실패했습니다. : ${error.message}`
    );
  }
};

// 2. 개인 참석 정보 조회
export const findAttendanceById = async (
  id: number
): Promise<GuestInfo | null> => {
  try {
    const result = await db.GuestInfo.findOne({ where: { id: Number(id) } });
    if (!result) {
      console.warn(`아이디에 해당하는 참석 정보가 없습니다. 아이디값 : ${id}`);
    }
    return result;
  } catch (error: any) {
    console.error(
      `참석 정보를 조회하는 데에 실패하였습니다. 다시 시도하여 주십시오.`,
      error
    );
    throw new Error(
      `참석 정보를 조회하는 데에 실패하였습니다. 다시 시도하여 주십시오. ${id}: ${error.message}`
    );
  }
};

// 3. 참석 정보 생성
export const createAttendance = async (
  attendanceData: attendanceData
): Promise<GuestInfo> => {
  try {
    const result = await db.GuestInfo.create({
      invitationId: attendanceData.invitationId,
      name: attendanceData.name,
      contact: attendanceData.contact,
      attendance: attendanceData.attendance ?? true, // 기본값 true
      isGroomSide: attendanceData.isGroomSide ?? false, // 기본값 false
      isBrideSide: attendanceData.isBrideSide ?? false, // 기본값 false
      companions: attendanceData.companions ?? 0, // 기본값 0
    });
    return result;
  } catch (error: any) {
    console.error("참석 정보를 등록하는 데에 실패하였습니다.", error);
    throw new Error(
      `참석 정보를 등록하는 데에 실패하였습니다. ${error.message}`
    );
  }
};

// 4. 참석 정보 삭제
export const deleteAttendance = async (
  name: string,
  contact: string
): Promise<boolean> => {
  try {
    console.log(
      `다음 이름과 이메일을 통해 참석 정보 삭제 시도중입니다.. name: ${name}, contact: ${contact}`
    );
    const attendance = await db.GuestInfo.findOne({
      where: { name, contact },
    });

    if (!attendance) {
      console.warn(
        `다음 이름과 이메일로 기록된 참석 정보가 없습니다. name: ${name}, contact: ${contact}`
      );
      return false;
    }

    await db.GuestInfo.destroy({ where: { name, contact } });
    console.log(
      `다음 이름과 이메일로 기록된 참석 정보가 성공적으로 삭제되었습니다. name: ${name}, contact: ${contact}.`
    );
    return true;
  } catch (error: any) {
    console.error(
      `다음 이름과 이메일로 기록된 참석 정보 삭제에 실패했습니다. name: ${name}, contact: ${contact}`,
      error
    );
    throw new Error(`참석 정보 삭제에 실패했습니다. : ${error.message}`);
  }
};
