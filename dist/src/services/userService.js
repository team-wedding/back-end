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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.naverLogin = exports.kakaoLogin = exports.myPage = exports.deleteUser = exports.changeUserInfo = exports.resetPassword = exports.changePassword = exports.updateAccessToken = exports.logout = exports.login = exports.signup = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const tokenRepository = __importStar(require("../repositories/tokenRepository"));
const authUtil = __importStar(require("../utils/authUtil"));
const generate_password_1 = __importDefault(require("generate-password"));
const nodemailerConfig_1 = require("../../config/nodemailerConfig");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const signup = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield userRepository.selectUser(userInfo.email)) {
            return false;
        }
        userInfo = yield authUtil.createHashPassword(userInfo);
        yield userRepository.createUser(userInfo);
        return true;
    }
    catch (err) {
        throw new Error(`userService signup err: ${err.message}`);
    }
});
exports.signup = signup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield userRepository.selectUser(email);
        if (userInfo && (yield authUtil.isMatchPassword(userInfo, password))) {
            const accessToken = yield authUtil.createAccessToken(userInfo);
            const refreshToken = yield authUtil.createRefreshToken(userInfo);
            if (yield tokenRepository.selectTokenByUid(userInfo.id)) {
                yield tokenRepository.deleteToken(userInfo.id);
            }
            yield tokenRepository.createToken(userInfo.id, refreshToken);
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
        return false;
    }
    catch (err) {
        throw new Error(`userService login Err: ${err.message}`);
    }
});
exports.login = login;
const logout = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tokenRepository.deleteToken(userInfo.id);
        return true;
    }
    catch (err) {
        throw new Error(`userService logout Err: ${err.message}`);
    }
});
exports.logout = logout;
const updateAccessToken = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield authUtil.createAccessToken(userInfo);
        return accessToken;
    }
    catch (err) {
        throw new Error(`userService updateAccessToken Err: ${err.message}`);
    }
});
exports.updateAccessToken = updateAccessToken;
const changePassword = (email, password, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield userRepository.selectUser(email);
        if ((yield authUtil.isMatchPassword(userInfo, password)) && password !== newPassword) {
            const salt = yield authUtil.createRandomSalt();
            const newHashPassword = yield authUtil.passwordChangeToHash(newPassword, salt);
            yield userRepository.updatePassword(userInfo.id, newHashPassword, salt);
            return true;
        }
        return false;
    }
    catch (err) {
        throw new Error(`userService changePassword Err: ${err.message}`);
    }
});
exports.changePassword = changePassword;
const resetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield userRepository.selectUser(email);
        if (userInfo) {
            const tempPassword = generate_password_1.default.generate({ length: 16, numbers: true, symbols: true });
            console.log("tempPassword: %s", tempPassword);
            const info = yield nodemailerConfig_1.transporter.sendMail({
                from: process.env.NODEMAILER_AUTH_USER,
                to: email,
                subject: '우결에서 임시 비밀번호를 발급드립니다.',
                html: "<h1 >우결에서 임시 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : " + tempPassword + "</h2>"
                    + '<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>'
            });
            console.log("Message sent: %s", info.messageId);
            const salt = yield authUtil.createRandomSalt();
            const newHashPassword = yield authUtil.passwordChangeToHash(tempPassword, salt);
            yield userRepository.updatePassword(userInfo.id, newHashPassword, salt);
            return true;
        }
        return false;
    }
    catch (err) {
        throw new Error(`userService resetPassword Err: ${err.message}`);
    }
});
exports.resetPassword = resetPassword;
const changeUserInfo = (email, newName, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield userRepository.selectUser(email);
        if (newName && newEmail) {
            yield userRepository.updateAllUserInfo(userInfo.id, newName, newEmail);
            return true;
        }
        if (newName) {
            yield userRepository.updateName(userInfo.id, newName);
            return true;
        }
        if (newEmail) {
            yield userRepository.updateEmail(userInfo.id, newEmail);
            return true;
        }
        return false;
    }
    catch (err) {
        throw new Error(`userService changeUserInfo Err: ${err.message}`);
    }
});
exports.changeUserInfo = changeUserInfo;
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield userRepository.selectUser(email);
        if (userInfo) {
            yield userRepository.deleteUser(userInfo);
            return true;
        }
        return false;
    }
    catch (err) {
        throw new Error(`userService deleteUser Err: ${err.message}`);
    }
});
exports.deleteUser = deleteUser;
const myPage = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userInfo = yield userRepository.selectUser(email);
        userInfo = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            createdAt: userInfo.createdAt,
            updatedAt: userInfo.updatedAt,
            provider: userInfo.provider
        };
        return userInfo;
    }
    catch (err) {
        throw new Error(`userService myPage Err: ${err.message}`);
    }
});
exports.myPage = myPage;
const kakaoLogin = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchedUserInfo = yield userRepository.selectUser(userInfo.email);
        if (searchedUserInfo) {
            if (searchedUserInfo.provider === "kakao") {
                const accessToken = yield authUtil.createAccessToken(searchedUserInfo);
                const refreshToken = yield authUtil.createRefreshToken(searchedUserInfo);
                if (yield tokenRepository.selectTokenByUid(searchedUserInfo.id)) {
                    yield tokenRepository.deleteToken(searchedUserInfo.id);
                }
                yield tokenRepository.createToken(searchedUserInfo.id, refreshToken);
                return { accessToken: accessToken, refreshToken: refreshToken };
            }
            return false;
        }
        userInfo = yield authUtil.createHashPassword(userInfo);
        yield userRepository.createUser(userInfo);
        searchedUserInfo = yield userRepository.selectUser(userInfo.email);
        const accessToken = yield authUtil.createAccessToken(searchedUserInfo);
        const refreshToken = yield authUtil.createRefreshToken(searchedUserInfo);
        if (yield tokenRepository.selectTokenByUid(searchedUserInfo.id)) {
            yield tokenRepository.deleteToken(searchedUserInfo.id);
        }
        yield tokenRepository.createToken(searchedUserInfo.id, refreshToken);
        return { accessToken: accessToken, refreshToken: refreshToken };
    }
    catch (err) {
        throw new Error(`userService signup err: ${err.message}`);
    }
});
exports.kakaoLogin = kakaoLogin;
const naverLogin = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchedUserInfo = yield userRepository.selectUser(userInfo.email);
        if (searchedUserInfo) {
            if (searchedUserInfo.provider === "naver") {
                const accessToken = yield authUtil.createAccessToken(searchedUserInfo);
                const refreshToken = yield authUtil.createRefreshToken(searchedUserInfo);
                if (yield tokenRepository.selectTokenByUid(searchedUserInfo.id)) {
                    yield tokenRepository.deleteToken(searchedUserInfo.id);
                }
                yield tokenRepository.createToken(searchedUserInfo.id, refreshToken);
                return { accessToken: accessToken, refreshToken: refreshToken };
            }
            return false;
        }
        userInfo = yield authUtil.createHashPassword(userInfo);
        yield userRepository.createUser(userInfo);
        searchedUserInfo = yield userRepository.selectUser(userInfo.email);
        const accessToken = yield authUtil.createAccessToken(searchedUserInfo);
        const refreshToken = yield authUtil.createRefreshToken(searchedUserInfo);
        if (yield tokenRepository.selectTokenByUid(searchedUserInfo.id)) {
            yield tokenRepository.deleteToken(searchedUserInfo.id);
        }
        yield tokenRepository.createToken(searchedUserInfo.id, refreshToken);
        return { accessToken: accessToken, refreshToken: refreshToken };
    }
    catch (err) {
        throw new Error(`userService signup err: ${err.message}`);
    }
});
exports.naverLogin = naverLogin;
