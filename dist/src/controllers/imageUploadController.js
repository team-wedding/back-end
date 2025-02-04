"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postImage = void 0;
const http_status_codes_1 = require("http-status-codes");
const postImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "이미지 파일이 필요합니다." });
            return;
        }
        const imageUrls = files.map(file => file.location); // 이미지가 저장된 경로 반환
        res.status(http_status_codes_1.StatusCodes.OK).json({ imageUrls });
    }
    catch (error) {
        console.error("이미지 업로드 오류:", error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 에러" });
    }
});
exports.postImage = postImage;
