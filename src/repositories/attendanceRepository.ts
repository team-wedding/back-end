import db from "../models";
import { attendanceData } from "../interfaces/attendance.interface";
import GuestInfo from "../models/guestInfo";

// 1. 전체 참석 정보 조회
export const findAllAttendances = async (
  userId: number,
  offset: number = 0,
  limit: number = 0
): Promise<GuestInfo[]> => {
  try {
    // 페이지네이션 있을 때
    if (offset && limit) {
      console.log("모든 참석 정보를 불러오는 중입니다...");
      const attendance = await db.GuestInfo.findAll({
        where: { userId },
        offset, // 시작 위치
        limit, // 가져올 데이터 개수
        order: [["id", "DESC"]], // 정렬 조건 : descending(내림차순)
      });
      if (!attendance) {
        console.log("전체 참석 정보가 없습니다.");
      }
      console.log("모든 참석 정보가 불러와졌습니다. : ", attendance);
      return attendance;
    } else {
      // 페이지네이션 안 쓸 때
      console.log("모든 참석 정보를 불러오는 중입니다...");
      const attendance = await db.GuestInfo.findAll({
        where: { userId },
      });
      if (!attendance) {
        console.log("전체 참석 정보가 없습니다.");
      }
      console.log("모든 참석 정보가 불러와졌습니다. : ", attendance);
      return attendance;
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `모든 참석 정보 기록을 불러오는 것에 실패했습니다. : ${errorMessage}`
    );
  }
};

// 개수 세기
export const countAttendances = async (userId: number) => {
  return await GuestInfo.count({
    where: { userId },
  });
};

// 2. 개인 참석 정보 조회
export const findMyAttendanceByParamsId = async (
  id: number,
  name: string,
  contact: string
): Promise<GuestInfo | null> => {
  try {
    console.log(
      `아이디 ${id}, 이름 ${name}, 연락처 ${contact}에 해당하는 개인 참석 정보를 불러오는 중입니다...`
    );
    const attendance = await db.GuestInfo.findOne({
      where: { id, name, contact },
    });
    if (!attendance) {
      console.log(
        `아이디 ${id}, 이름 ${name}, 연락처 ${contact}에 해당하는 참석 정보가 없습니다.`
      );
    }
    return attendance;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `아이디 ${id}, 이름 ${name}, 연락처 ${contact}의 참석 정보를 불러오는 것에 실패했습니다. : ${errorMessage}`
    );
  }
};

// 3. 개인 참석 정보 생성
export const createMyAttendance = async (
  attendanceData: attendanceData
): Promise<GuestInfo> => {
  try {
    const attendance = await db.GuestInfo.create({
      userId: attendanceData.userId,
      invitationId: attendanceData.invitationId,
      name: attendanceData.name,
      contact: attendanceData.contact,
      isDining: attendanceData.isDining,
      attendance: attendanceData.attendance,
      isGroomSide: attendanceData.isGroomSide,
      isBrideSide: attendanceData.isBrideSide,
      companions: attendanceData.companions,
    });
    if (!attendance) {
      console.log("참석 정보 등록에 필요한 정보를 생성하지 못했습니다.");
    }
    return attendance;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(`참석 정보 등록에 실패했습니다. : ${errorMessage}`);
  }
};

// 4. 개인 참석 정보 삭제   // 이름 + 연락처
export const removeMyAttendanceByContact = async (
  id: number,
  name: string,
  contact: string
): Promise<boolean> => {
  try {
    console.log(
      `다음 이름과 연락처를 통해 참석 정보 삭제 시도중입니다.. name: ${name}, contact: ${contact}`
    );
    const attendance = await db.GuestInfo.findOne({
      where: { id, name, contact },
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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(
      `다음 이름과 이메일로 기록된 참석 정보 삭제에 실패했습니다. name: ${name}, contact: ${contact} : ${errorMessage}`
    );
  }
};
