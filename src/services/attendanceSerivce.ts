import * as attendanceRepository from "../repositories/attendanceRepository";
import { attendanceData } from "../interfaces/attendance.interface";

// 1. 전체 참석 정보 조회
export const getAllAttendances = async (invitationId: number) => {
  try {
    return await attendanceRepository.findAllAttendances(invitationId);
  } catch (err: any) {
    throw new Error(
      `Error occurred while fetching all attendance data: ${err.message}`
    );
  }
};

// 2. 개인 참석 정보 조회
export const getMyAttendance = async (id: number) => {
  try {
    return await attendanceRepository.findAttendanceById(id);
  } catch (err: any) {
    throw new Error(
      `Error occurred while fetching individual attendance data: ${err.message}`
    );
  }
};

// 3. 개인 참석 정보 등록
export const postMyAttendance = async (attendanceData: attendanceData) => {
  try {
    return await attendanceRepository.createAttendance(attendanceData);
  } catch (err: any) {
    throw new Error(
      `Error occurred while posting individual attendance data: ${err.message}`
    );
  }
};

// 4. 개인 참석 정보 삭제
export const deleteMyAttendance = async (
  id: number,
  name: string,
  contact: string
) => {
  try {
    return await attendanceRepository.deleteAttendance(name, contact);
  } catch (err: any) {
    throw new Error(
      `Error occurred while deleting individual attendance data: ${err.message}`
    );
  }
};
