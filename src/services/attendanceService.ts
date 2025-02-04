import * as attendanceRepository from "../repositories/attendanceRepository";
import { attendanceData } from "../interfaces/attendance.interface";

// 1. 전체 참석 정보 조회
export const getAllAttendances = async (
  userId: number,
  page?: number,
  size?: number
) => {
  try {
    if (page !== undefined && size !== undefined) {
      const offset = (page - 1) * size;
      const limit = size;

      const allAttendances = await attendanceRepository.findAllAttendances(
        userId,
        offset,
        limit
      );
      const totalItems = await attendanceRepository.countAttendances(userId);
      const totalPages = Math.ceil(totalItems / size);

      return { allAttendances, totalItems, totalPages };
    }

    return await attendanceRepository.findAllAttendances(userId);
  } catch (error) {
    throw new Error(
      `모든 참석 정보 기록을 불러오는 것에 실패했습니다. : ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
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
