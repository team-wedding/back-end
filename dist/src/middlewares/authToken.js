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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.naverAuthToken = exports.kakaoAuthToken = exports.authToken = void 0;
const authUtil_1 = require("../utils/authUtil");
const http_status_codes_1 = require("http-status-codes");
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: '토큰값 없음.. 확인ㄱㄱ' });
            return;
        }
        let userInfo = yield (0, authUtil_1.localAuth)(accessToken);
        if (!userInfo) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: '유효하지 않은 토큰' });
            return;
        }
        req.userInfo = userInfo;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: '서버 에러' });
        return;
    }
});
exports.authToken = authToken;
const kakaoAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kakaoToken = yield (0, axios_1.default)({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: qs_1.default.stringify({
                grant_type: "authorization_code",
                client_id: process.env.KAKAO_ID,
                redirectUri: process.env.KAKAO_REDIRECT_URI,
                code: req.body.code,
            })
        });
        if (!kakaoToken) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'kakaoAuthToken Error : kakao에서 accessToken 안넘어옴;;' });
            return;
        }
        let userInfo = yield (0, authUtil_1.kakaoAuth)(kakaoToken);
        if (!userInfo) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'kakaoAuthToken userInfo err' });
            return;
        }
        req.userInfo = userInfo;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: 'kakaoAuthToken 서버 에러' });
        return;
    }
});
exports.kakaoAuthToken = kakaoAuthToken;
const naverAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const naverToken = yield (0, axios_1.default)({
            method: "POST",
            url: "https://nid.naver.com/oauth2.0/token",
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_ID,
                'X-Naver-Client-Secret': process.env.NAVER_SECRET
            },
            data: qs_1.default.stringify({
                grant_type: "authorization_code",
                response_type: "code",
                client_id: process.env.NAVER_ID,
                client_secret: process.env.NAVER_SECRET,
                redirect_uri: process.env.NAVER_REDIRECT_URI,
                code: req.body.code,
                state: "test"
            })
        });
        if (!naverToken) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'naverAuthToken Error : naver에서 accessToken 안넘어옴;;' });
            return;
        }
        let userInfo = yield (0, authUtil_1.naverAuth)(naverToken);
        if (!userInfo) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'naverAuthToken userInfo err' });
            return;
        }
        req.userInfo = userInfo;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: 'naverAuthToken 서버 에러' });
        return;
    }
});
exports.naverAuthToken = naverAuthToken;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let refreshToken = req.headers.refresh;
        refreshToken = refreshToken.split(' ')[1];
        if (!(yield (0, authUtil_1.isMatchRefreshToken)(refreshToken))) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: '다시 로그인하세요~' });
            return;
        }
        const userInfo = yield (0, authUtil_1.verifyToken)(refreshToken);
        req.userInfo = userInfo;
        req.userId = userInfo.id; // userId를 req.userId에 저장
        next();
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러 in refreshToken' });
        console.log(err);
        return;
    }
});
exports.refreshToken = refreshToken;
