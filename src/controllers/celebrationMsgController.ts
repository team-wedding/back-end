import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as celebrationMsgService from "../services/celebrationMsgService";
import { celebrationMsgData } from "../interfaces/celebrationMsg.interface";
import { User as IUser } from "../interfaces/user.interface";

// 1. 전체 축하메세지 정보 조회 + get
export const getAllCelebrationMsgs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo: IUser = req.userInfo;

    if (!userInfo) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "인증 실패" });
      return;
    }
    const userId = userInfo.id as number;
    const allCelebrationMsgs =
      await celebrationMsgService.getAllCelebrationMsgs(userId);

    res.status(StatusCodes.OK).json(allCelebrationMsgs);
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 2. 개인이 작성한 축하메세지 조회 + get
export const getMyCelebrationMsg = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, password } = req.body;
  try {
    const celebrationMsg = await celebrationMsgService.getMyCelebrationMsg(
      id,
      name,
      password
    );
    if (celebrationMsg) {
      res.status(StatusCodes.OK).json(celebrationMsg);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "작성한 축하 메세지가 없습니다. 비밀번호를 다시 확인해주세요.",
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 3. 개인이 작성한 축하메세지 등록 + post   // 이름 + 비밀번호
export const postMyCelebrationMsg = async (
  req: Request<{}, {}, celebrationMsgData>,
  res: Response
): Promise<void> => {
  const {
    userId,
    invitationId,
    name,
    password,
    imageUrl,
    message,
    createdAt,
    updatedAt,
  } = req.body;

  try {
    // // 이미지 업로드 결과 처리 - 250127
    // const imageUrl = req.file ? (req.file as any).location : null;

    // 여러 이미지 업로드 처리
    const imageUrls = req.files
      ? (req.files as any[]).map((file) => file.location) // 업로드된 각 이미지 URL을 배열로 처리
      : [];

    await celebrationMsgService.postMyCelebrationMsg({
      userId,
      invitationId,
      name,
      password,
      imageUrl: JSON.stringify(imageUrls),
      message,
      createdAt,
      updatedAt,
    });
    res.status(StatusCodes.CREATED).json({
      message: `${name}님이 작성하신 축하 메세지가 성공적으로 등록되었습니다.`,
      imageUrls,
      // imageUrl,
    });
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "서버 에러" });
  }
};

// 4. 개인이 작성한 축하메세지 수정 + put       // 이름 + 비밀번호
export const putMyCelebrationMsg = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, password, message } = req.body;

    const updatedcelebrationMsg =
      await celebrationMsgService.putMyCelebrationMsg(
        id,
        name,
        password,
        message
      );

    if (updatedcelebrationMsg) {
      res.status(StatusCodes.OK).json({
        message: `${name}님의 축하 메세지가 성공적으로 수정되었습니다.`,
        data: updatedcelebrationMsg,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `축하 메세지를 찾을 수 없거나, 이름 및 비밀번호가 일치하지 않습니다.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};

// 5. 개인이 작성한 축하메세지 삭제 + delete      // 이름 + 비밀번호
export const deleteMyCelebrationMsg = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const result = await celebrationMsgService.deleteMyCelebrationMsg(
      id,
      name,
      password
    );
    if (result) {
      res.status(StatusCodes.OK).json({
        message: `${name}님이 작성하신 축하 메세지가 성공적으로 삭제되었습니다.`,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `${name}님이 작성하신 축하 메세지가 존재하지 않습니다.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
  }
};
