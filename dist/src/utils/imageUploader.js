"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
const imageUploader = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: new aws_sdk_1.default.S3(),
        bucket: process.env.AWS_BUCKET_NAME, // 업로드할 버킷 이름
        key: (req, file, callback) => {
            var _a;
            const uploadDirectory = (_a = req.query.directory) !== null && _a !== void 0 ? _a : 'uploads';
            const extension = path_1.default.extname(file.originalname);
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error('wrong extension'));
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`); //저장될 S3의 저장소 경로 설정
        },
        acl: 'public-read-write',
    }),
});
exports.default = imageUploader;
