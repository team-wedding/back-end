import { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const postImage: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = req.files as Express.MulterS3.File[];

    if (!files || files.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "이미지 파일이 필요합니다." });
      return;
    }

    const imageUrls = files.map(file => file.location); // 이미지가 저장된 경로 반환

    res.status(StatusCodes.OK).json({ message: "이미지가 정상적으로 업로드 되었습니다", imageUrls });
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 에러" });
  }
};
