import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteImageFromS3, uploadBufferToS3 } from "../utils/s3";
import { extractS3KeyFromUrl } from "../utils/s3";
import { getInvitationById } from "../repositories/invitationRepository";
import db from '../models';
import sharp from "sharp";

export const postImage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.MulterS3.File[];

    if (!files || files.length === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "이미지 파일이 필요합니다." });
      return;
    }

    const uploadDirectory = (req.query.directory as string) || 'uploads';
    const resizedImageUrls: string[] = [];

    for (const file of files) {
      const baseName = `${Date.now()}_${file.originalname}`;
      const key = `${uploadDirectory}/${baseName}`;

      // 리사이즈 크기 및 포맷 지정
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: 450 })
        .toFormat('webp')
        .toBuffer();

      const uploadedUrl = await uploadBufferToS3(resizedBuffer, `${key}.webp`, 'image/webp');
      resizedImageUrls.push(uploadedUrl);
    }

    res.status(StatusCodes.OK).json({ imageUrls: resizedImageUrls });
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 에러" });
  }
};

export const deleteInvitationImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "유효한 초대장 ID가 필요합니다." });
      return;
    }

    const invitation = await getInvitationById(id);

    if (!invitation) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "해당 초대장이 존재하지 않습니다." });
      return;
    }

    const urlsToDelete: string[] = []; 

    if (invitation.imgUrl) { // 청첩장의 대표 이미지
      urlsToDelete.push(invitation.imgUrl);
    }

    if (invitation.galleries?.length) { // 갤러리의 이미지들
      invitation.galleries.forEach((gallery: any) => {
        if (typeof gallery.images === 'string') {
          try {
            const parsedImages = JSON.parse(gallery.images);
            if (Array.isArray(parsedImages)) {
              parsedImages.forEach((imgUrl: string) => {
                if (typeof imgUrl === 'string') {
                  urlsToDelete.push(imgUrl);
                }
              });
            }
          } catch (err) {
            console.warn("images JSON 파싱 실패:", gallery.images);
          }
        }
      });
    }    

    if (invitation.notices?.length) { // 공지사항의 이미지
      invitation.notices.forEach((notice: any) => {
        if (notice.image) {
          urlsToDelete.push(notice.image);
        }
      });
    }

    for (const url of urlsToDelete) {
      const key = extractS3KeyFromUrl(url);
      if (!key) {
        console.warn("S3 key 추출 실패:", url);
        continue;
      }
    
      try {
        await deleteImageFromS3(key);
        console.log(`삭제 성공: ${key}`);
      } catch (err) {
        console.error(`삭제 실패 (${key}):`, (err as Error).message);
      }
    }    

    res.status(StatusCodes.OK).json({ message: "모든 관련 이미지가 성공적으로 삭제되었습니다." });
  } catch (error: any) {
    console.error("이미지 삭제 오류:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteCelebrationMsgImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "유효한 포토톡 ID가 필요합니다." });
      return;
    }

    const celebrationMsg = await db.CelebrationMsg.findOne({
      where: { id },
    });

    if (!celebrationMsg) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "해당 축하 메시지가 존재하지 않습니다." });
      return;
    }

    if (!celebrationMsg.imageUrl) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "삭제할 이미지가 존재하지 않습니다." });
      return;
    }

    const urlsToDelete: string[] = []; 

    try {
      const parsedImages = JSON.parse(celebrationMsg.imageUrl);

      if (Array.isArray(parsedImages)) {
        parsedImages.forEach((imgUrl: any) => {
          if (typeof imgUrl === 'string') {
            urlsToDelete.push(imgUrl);
          }
        });
      } else {
        console.warn("imageUrl이 배열이 아닙니다.:", celebrationMsg.imageUrl);
      }
    } catch (err) {
      console.warn("imageUrl JSON 파싱 실패:", celebrationMsg.imageUrl);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "이미지 정보를 파싱할 수 없습니다." });
      return;
    }

    for (const url of urlsToDelete) {
      const key = extractS3KeyFromUrl(url);
      if (!key) {
        console.warn("S3 key 추출 실패:", url);
        continue;
      }
    
      try {
        await deleteImageFromS3(key);
        console.log(`삭제 성공: ${key}`);
      } catch (err) {
        console.error(`삭제 실패 (${key}):`, (err as Error).message);
      }
    }    

    res.status(StatusCodes.OK).json({ message: "포토톡 이미지들이 성공적으로 삭제되었습니다." });
  } catch (error: any) {
    console.log('이미지 삭제 오류', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
};