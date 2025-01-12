import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as attendanceService from "../services/attendanceSerivce";
import { attendanceData } from "../interfaces/attendance.interface";
import { User as IUser } from '../interfaces/user.interface';

// 1. 전체 참석 정보 조회
export const getAllAttendances = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo: IUser = req.userInfo; // 토큰에서 사용자 정보 추출

    if (!userInfo) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "인증 실패" });
      return;
    }

    const invitationId = userInfo.id as number;
    const allAttendances = await attendanceService.getAllAttendances(
      invitationId
    );

    res.status(StatusCodes.OK).json(allAttendances);
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 2. 개인 참석 정보 조회
export const getMyAttendance = async (
  req: Request<{ id: number }>, // Request의 제네릭 타입 지정
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const attendance = await attendanceService.getMyAttendance(id);
    if (attendance) {
      res.status(StatusCodes.OK).json(attendance);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "참석 정보가 없습니다." });
    }
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 3. 개인 참석 정보 등록
export const postMyAttendance = async (
  req: Request<{}, {}, attendanceData>, // Request에 Body 타입 지정
  res: Response
): Promise<void> => {
  const {
    invitationId,
    name,
    contact,
    attendance,
    isGroomSide,
    isBrideSide,
    companions,
  } = req.body;

  try {
    await attendanceService.postMyAttendance({
      invitationId,
      name,
      contact,
      attendance,
      isGroomSide,
      isBrideSide,
      companions,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "결혼식 참석 여부가 [참석]으로 등록되었습니다." });
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "서버 에러" });
  }
};

// 4. 개인 참석 정보 삭제
export const deleteMyAttendance = async (
  req: Request<{ id: number }, {}, { name: string; contact: string }>,
  res: Response
): Promise<void> => {
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
