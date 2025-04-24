import AWS from 'aws-sdk';
import multer from 'multer';
import multers3 from 'multer-s3';
import path from 'path';
import { Request} from "express";
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({ // AWS 설정
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const allowedExtensions = ['.png', '.jpg', '.JPG', '.PNG', '.jpeg', '.JPEG', '.bmp', '.BMP'];

const imageUploader = multer({ // multer 설정
    storage: multers3({
        s3: new AWS.S3() as any,
        bucket: process.env.AWS_BUCKET_NAME as string, // 업로드할 버킷 이름
        key: (req:Request, file, callback) => {
            const uploadDirectory = req.query.directory ?? 'uploads';
            const extension = path.extname(file.originalname);
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error('wrong extension'));
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`); // 저장될 S3의 저장소 경로 설정
        },
        acl: 'public-read-write',
    }),
});

const s3 = new AWS.S3();

export const deleteImageFromS3 = async (key: string): Promise<void> => { // 이미지 삭제
    const bucket = process.env.AWS_BUCKET_NAME as string;
  
    // 해당 key가 실제로 존재하는지 먼저 확인
    try {
      await s3.headObject({ Bucket: bucket, Key: key }).promise();
    } catch (err: any) {
      if (err.code === 'NotFound') {
        throw new Error('해당 key의 파일이 존재하지 않습니다.');
      }
      throw new Error('S3 확인 중 오류 발생: ' + err.message);
    }
  
    // 존재하면 삭제 실행
    try {
      await s3.deleteObject({ Bucket: bucket, Key: key }).promise();
    } catch (err: any) {
      throw new Error('S3 삭제 중 오류 발생: ' + err.message);
    }
  };

export const extractS3KeyFromUrl = (url: string): string | null => { // url 값 추출
  try {
    const { pathname } = new URL(url);
    return decodeURIComponent(pathname).slice(1); 
  } catch {
    return null;
  }
};
  
export default imageUploader;