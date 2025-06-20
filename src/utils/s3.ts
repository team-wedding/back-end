import AWS from 'aws-sdk';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({ // AWS 설정
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const allowedExtensions = ['.png', '.jpg', '.JPG', '.PNG', '.jpeg', '.JPEG', '.bmp', '.BMP'];

const s3 = new AWS.S3();

export const imageUploader = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return cb(new Error('허용되지 않은 이미지 형식입니다.'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export const uploadBufferToS3 = async ( buffer: Buffer, key: string, mimetype: string ): Promise<string> => {
  const bucket = process.env.AWS_BUCKET_NAME!;

  await s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    }).promise();

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

};

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
