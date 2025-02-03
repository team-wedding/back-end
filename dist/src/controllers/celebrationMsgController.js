"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteMyCelebrationMsg = exports.putMyCelebrationMsg = exports.postMyCelebrationMsg = exports.getMyCelebrationMsg = exports.getAllCelebrationMsgs = void 0;
const http_status_codes_1 = require("http-status-codes");
const celebrationMsgService = __importStar(require("../services/celebrationMsgService"));
const error_1 = require("../utils/error");
// api 예시 : localhost:3000/api/celebrationMsgs?page=1&size=4
// 1. 전체 축하메세지 정보 조회 + get
const getAllCelebrationMsgs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        const userId = userInfo.id;
        if (!userInfo) {
            res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "userInfo가 존재하지 않습니다. 인증 실패" });
            return;
        }
        // 페이지네이션 파라미터 받기
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const { allCelebrationMsgs, totalItems, totalPages } = yield celebrationMsgService.getAllCelebrationMsgs(userId, page, size);
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ allCelebrationMsgs, totalItems, totalPages, currentPage: page });
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
    }
});
exports.getAllCelebrationMsgs = getAllCelebrationMsgs;
// 2. 개인이 작성한 축하메세지 조회 + get
const getMyCelebrationMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, password } = req.body;
    try {
        const celebrationMsg = yield celebrationMsgService.getMyCelebrationMsg(id, name, password);
        if (celebrationMsg) {
            res.status(http_status_codes_1.StatusCodes.OK).json(celebrationMsg);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "작성한 축하 메세지가 없습니다. 비밀번호를 다시 확인해주세요.",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
    }
});
exports.getMyCelebrationMsg = getMyCelebrationMsg;
// 3. 개인이 작성한 축하메세지 등록 + post   // 이름 + 비밀번호
const postMyCelebrationMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, invitationId, name, password, imageUrl, message, createdAt, updatedAt, } = req.body;
    try {
        // // 이미지 업로드 결과 처리 - 250127
        // const imageUrl = req.file ? (req.file as any).location : null;
        // 여러 이미지 업로드 처리
        // const imageUrls = req.files
        //   ? (req.files as any[]).map((file) => file.location) // 업로드된 각 이미지 URL을 배열로 처리
        //   : [];
        yield celebrationMsgService.postMyCelebrationMsg({
            userId,
            invitationId,
            name,
            password,
            imageUrl,
            message,
            createdAt,
            updatedAt,
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: `${name}님이 작성하신 축하 메세지가 성공적으로 등록되었습니다.`,
            imageUrl,
        });
    }
    catch (err) {
        if (err instanceof error_1.ClientError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: err.message });
            return;
        }
        else {
            console.error(err);
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: err.message || "서버 에러" });
        }
    }
});
exports.postMyCelebrationMsg = postMyCelebrationMsg;
// 4. 개인이 작성한 축하메세지 수정 + put       // 이름 + 비밀번호
const putMyCelebrationMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, password, message } = req.body;
        const updatedcelebrationMsg = yield celebrationMsgService.putMyCelebrationMsg(id, name, password, message);
        if (updatedcelebrationMsg) {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: `${name}님의 축하 메세지가 성공적으로 수정되었습니다.`,
                data: updatedcelebrationMsg,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: `축하 메세지를 찾을 수 없거나, 이름 및 비밀번호가 일치하지 않습니다.`,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
    }
});
exports.putMyCelebrationMsg = putMyCelebrationMsg;
// 5. 개인이 작성한 축하메세지 삭제 + delete      // 이름 + 비밀번호
const deleteMyCelebrationMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, password } = req.body;
    try {
        const result = yield celebrationMsgService.deleteMyCelebrationMsg(id, name, password);
        if (result) {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: `${name}님이 작성하신 축하 메세지가 성공적으로 삭제되었습니다.`,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: `${name}님이 작성하신 축하 메세지가 존재하지 않습니다.`,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
    }
});
exports.deleteMyCelebrationMsg = deleteMyCelebrationMsg;
