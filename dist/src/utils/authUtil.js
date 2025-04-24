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
exports.isMatchRefreshToken = exports.verifyToken = exports.createRefreshToken = exports.createAccessToken = exports.passwordChangeToHash = exports.createRandomSalt = exports.isMatchPassword = exports.createHashPassword = exports.naverAuth = exports.kakaoAuth = exports.localAuth = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokenRepository = __importStar(require("../repositories/tokenRepository"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const localAuth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield (0, exports.verifyToken)(token);
        return userInfo;
    }
    catch (err) {
        throw new Error(`localAuth Err: ${err.message}`);
    }
});
exports.localAuth = localAuth;
const kakaoAuth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kakaoUserInfo = yield (0, axios_1.default)({
            method: "GET",
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
        const userInfo = {
            email: kakaoUserInfo.data.kakao_account.email,
            name: kakaoUserInfo.data.properties.nickname,
            password: kakaoUserInfo.data.id.toString(),
            provider: "kakao"
        };
        return userInfo;
    }
    catch (err) {
        throw new Error(`kakaoAuth Err: ${err.message}`);
    }
});
exports.kakaoAuth = kakaoAuth;
const naverAuth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const naverUserInfo = yield (0, axios_1.default)({
            method: "GET",
            url: "https://openapi.naver.com/v1/nid/me",
            headers: {
                Authorization: `Bearer ${token.data.access_token}`,
            },
        });
        console.log(`naverUserInfo : ${JSON.stringify(naverUserInfo.data.response)}`);
        const userInfo = {
            email: naverUserInfo.data.response.email,
            name: naverUserInfo.data.response.name,
            password: naverUserInfo.data.response.id,
            provider: "naver"
        };
        return userInfo;
    }
    catch (err) {
        throw new Error(`kakaoAuth Err: ${err.message}`);
    }
});
exports.naverAuth = naverAuth;
const createHashPassword = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield (0, exports.createRandomSalt)();
        const hashPassword = yield (0, exports.passwordChangeToHash)(userInfo.password, salt);
        userInfo.salt = salt;
        userInfo.hashPassword = hashPassword;
        return userInfo;
    }
    catch (err) {
        throw new Error(`makeHashPassword Err: ${err.message}`);
    }
});
exports.createHashPassword = createHashPassword;
const isMatchPassword = (userInfo, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userInfo.hashPassword == (yield (0, exports.passwordChangeToHash)(password, userInfo.salt))) {
            return true;
        }
        return false;
    }
    catch (err) {
        throw new Error(`isMatchPassword Err: ${err.message}`);
    }
});
exports.isMatchPassword = isMatchPassword;
const createRandomSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    const salt = crypto_1.default.randomBytes(10).toString('base64');
    return salt;
});
exports.createRandomSalt = createRandomSalt;
const passwordChangeToHash = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = crypto_1.default.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    return hashPassword;
});
exports.passwordChangeToHash = passwordChangeToHash;
const createAccessToken = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const secreyKey = process.env.TOKEN_SECRET_KEY || "";
    try {
        const accessToken = jsonwebtoken_1.default.sign({
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email
        }, secreyKey, { expiresIn: '1d' });
        return accessToken;
    }
    catch (err) {
        throw new Error(`createAccessToken Err: ${err.message}`);
    }
});
exports.createAccessToken = createAccessToken;
const createRefreshToken = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const secreyKey = process.env.TOKEN_SECRET_KEY || "";
    try {
        const refreshToken = jsonwebtoken_1.default.sign({
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email
        }, secreyKey, { expiresIn: '7d' });
        return refreshToken;
    }
    catch (err) {
        throw new Error(`createRefreshToken Err': ${err.message}`);
    }
});
exports.createRefreshToken = createRefreshToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const secreyKey = process.env.TOKEN_SECRET_KEY || "";
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(token, secreyKey);
        let userInfo = {
            id: jwtPayload.id,
            name: jwtPayload.name,
            email: jwtPayload.email
        };
        return userInfo;
    }
    catch (err) {
        throw new Error(`verifyToken Err': ${err.message}`);
    }
});
exports.verifyToken = verifyToken;
const isMatchRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenInfo = yield tokenRepository.selectTokenByToken(token);
        if (token == refreshTokenInfo.token) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
});
exports.isMatchRefreshToken = isMatchRefreshToken;
