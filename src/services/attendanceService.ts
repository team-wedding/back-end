import * as attendanceRepository from "../repositories/attendanceRepository";
import { attendanceData } from "../interfaces/attendance.interface";

// 1. 전체 참석 정보 조회
export const getAllAttendances = async (
  userId: number,
  page: number = 0,
  size: number = 0
) => {
  try {
    // 시작 위치 계산
    const offset = (page - 1) * size;
    const limit = size;

    // 페이지네이션 있을 때
    if (page > 0 && size > 0) {
      // repo 호출
      const allAttendances = await attendanceRepository.findAllAttendances(
        userId,
        offset,
        limit
      );

      // 전체 데이터 개수 및 총 페이지 계산
      const totalItems = await attendanceRepository.countAttendances(userId);
      const totalPages = Math.ceil(totalItems / size);

      return {
        allAttendances,
        totalItems,
        totalPages,
      };
    } else {
      // 페이지네이션 안 쓸 때 (page와 size의 기본값이 0)
      return await attendanceRepository.findAllAttendances(userId); // 원래 코드
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

// 2. 개인 참석 정보 조회
export const getMyAttendance = async (
  id: number,
  name: string,
  contact: string
) => {
  try {
    return await attendanceRepository.findMyAttendanceByParamsId(
      id,
      name,
      contact
    );
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

// 3. 개인 참석 정보 등록
export const postMyAttendance = async (attendanceData: attendanceData) => {
  try {
    return await attendanceRepository.createMyAttendance(attendanceData);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    throw new Error(`참석 정보 등록에 실패했습니다. : ${errorMessage}`);
  }
};

// 4. 개인 참석 정보 삭제
export const deleteMyAttendance = async (
  id: number,
  name: string,
  contact: string
) => {
  try {
    return await attendanceRepository.removeMyAttendanceByContact(
      id,
      name,
      contact
    );
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
