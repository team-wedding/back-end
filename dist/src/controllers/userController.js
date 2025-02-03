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
exports.naverLogin = exports.kakaoLogin = exports.deleteUser = exports.changeUserInfo = exports.resetPassword = exports.changePassword = exports.myPage = exports.updateAccessToken = exports.logout = exports.login = exports.signup = void 0;
const http_status_codes_1 = require("http-status-codes");
const userService = __importStar(require("../services/userService"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    try {
        if (yield userService.signup(userInfo)) {
            res.status(201).json({ message: '가입완료' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '중복된 이메일입니다.' });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const tokens = yield userService.login(email, password);
        console.log(tokens);
        if (tokens) {
            res.header('Authorization', `Bearer ${tokens.accessToken}`);
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '로그인' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '로그인 실패' });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        yield userService.logout(userInfo);
        res.clearCookie('refreshToken');
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: '로그아웃' });
        return;
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.logout = logout;
const updateAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        const newAccessToken = yield userService.updateAccessToken(userInfo);
        res.header('Authorization', `Bearer ${newAccessToken}`);
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'accessToken 재발행 완' });
        return;
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.updateAccessToken = updateAccessToken;
const myPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userInfo = req.userInfo;
        userInfo = yield userService.myPage(userInfo.email);
        res.status(http_status_codes_1.StatusCodes.OK).json(userInfo);
        return;
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.myPage = myPage;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        const { password, newPassword } = req.body;
        if (yield userService.changePassword(userInfo.email, password, newPassword)) {
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '비밀번호 변경완료' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '잘못된 요청입니다.' });
        return;
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.changePassword = changePassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (yield userService.resetPassword(email)) {
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '임시 비밀번호 발급 완료' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '회원 가입되지 않은 이메일 입니다.' });
        return;
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.resetPassword = resetPassword;
const changeUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        const { newName, newEmail } = req.body;
        console.log(newName);
        console.log(newEmail);
        if (yield userService.changeUserInfo(userInfo.email, newName, newEmail)) {
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '변경완료' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '잘못된 요청입니다.' });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.changeUserInfo = changeUserInfo;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        if (yield userService.deleteUser(userInfo.email)) {
            res.clearCookie('refreshToken');
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '탈퇴 되었습니다.' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '잘못된 접근입니다.' });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '서버 에러' });
        return;
    }
});
exports.deleteUser = deleteUser;
const kakaoLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.userInfo;
    console.log(userInfo);
    try {
        const tokens = yield userService.kakaoLogin(userInfo);
        console.log(tokens);
        if (tokens) {
            res.header('Authorization', `Bearer ${tokens.accessToken}`);
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '로그인' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '이미 해당 email로 회원가입된 이력있음.' });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'kakaoLogin 서버 에러' });
        return;
    }
});
exports.kakaoLogin = kakaoLogin;
const naverLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.userInfo;
    console.log(userInfo);
    try {
        const tokens = yield userService.naverLogin(userInfo);
        console.log(tokens);
        if (tokens) {
            res.header('Authorization', `Bearer ${tokens.accessToken}`);
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '로그인' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '이미 해당 email로 회원가입된 이력있음.' });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'naverLogin 서버 에러' });
        return;
    }
});
exports.naverLogin = naverLogin;
