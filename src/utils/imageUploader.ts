import AWS from 'aws-sdk';
import multer from 'multer';
import multers3 from 'multer-s3';
import path from 'path';
import { Request} from "express";
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({ //AWS 설정
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];

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
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`); //저장될 S3의 저장소 경로 설정
        },
        acl: 'public-read-write',
    }),
});

export default imageUploader;