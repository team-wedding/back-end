import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as attendanceService from "../services/attendanceService";
import {
  attendanceData,
  paginatedAllAttendances,
  allAttendances,
} from "../interfaces/attendance.interface";
import { User as IUser } from "../interfaces/user.interface";

// api 예시 : http://localhost:3000/api/attendances?page=1&size=4
// 1. 전체 참석 정보 조회
export const getAllAttendances = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo: IUser = req.userInfo; // 토큰에서 사용자 정보 추출
    const userId = userInfo.id as number;

    // 페이지네이션 파라미터 받기
    const page = parseInt(req.query.page as string);
    const size = parseInt(req.query.size as string);

    // 페이지네이션 쓸 때
    if (page && size) {
      const result = await attendanceService.getAllAttendances(
        userId,
        page,
        size
      );

      if ("totalItems" in result && "totalPages" in result) {
        const { allAttendances, totalItems, totalPages } = result;
        if (allAttendances && allAttendances.length > 0) {
          res.status(StatusCodes.OK).json({
            allAttendances,
            totalItems,
            totalPages,
            currentPage: page,
          });
          return;
        }
      }
    }
    // const { allAttendances, totalItems, totalPages } =
    // await attendanceService.getAllAttendances(userId, page, size);

    // if (allAttendances && allAttendances.length > 0) {
    //   res.status(StatusCodes.OK).json({
    //     allAttendances,
    //     totalItems,
    //     totalPages,
    //     currentPage: page,
    //   });
    //   return;
    else {
      // 페이지네이션 안 쓰는 전체 조회일 때
      const result = await attendanceService.getAllAttendances(userId); // 원래 코드

      // 결과가 배열로 오면 그 데이터를 그대로 응답
      if (Array.isArray(result)) {
        if (result.length > 0) {
          res.status(StatusCodes.OK).json({
            allAttendances: result,
          });
          return;
        }
      }
      // if ("allAttendances" in result) {
      //   const allAttendances = result.allAttendances;

      //   if (allAttendances && allAttendances.length > 0) {
      //     res.status(StatusCodes.OK).json({
      //       allAttendances: result,
      //     });
      //     return;
      //   }
    }

    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "전체 참석 정보가 존재하지 않습니다." });

    // if (!userInfo) {
    //   res
    //     .status(StatusCodes.UNAUTHORIZED)
    //     .json({ message: "인증에 실패하였습니다. 토큰값을 확인해주세요." });
    //   return;
    // }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "서버 에러, 서버를 다시 확인해주세요." });
  }
};

// 2. 개인 참석 정보 조회
export const getMyAttendance = async (
  req: Request<{ id: number }>, // Request의 제네릭 타입 지정
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, contact } = req.body;
  try {
    const attendance = await attendanceService.getMyAttendance(
      id,
      name,
      contact
    );
    if (attendance) {
      res.status(StatusCodes.OK).json(attendance);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "참석 정보가 없습니다. 이름과 이메일을 다시 확인해주세요.",
      });
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
    userId,
    invitationId,
    name,
    contact,
    isDining,
    attendance,
    isGroomSide,
    isBrideSide,
    companions,
  } = req.body;

  try {
    await attendanceService.postMyAttendance({
      userId,
      invitationId,
      name,
      contact,
      isDining,
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

// 4. 개인 참석 정보 삭제     // 이름과 연락처
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
