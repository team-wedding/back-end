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
exports.selectTokenByToken = exports.selectTokenByUid = exports.deleteToken = exports.createToken = void 0;
const models_1 = __importDefault(require("../models"));
const createToken = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Token.create({
            userId: id,
            token: refreshToken
        });
        return;
    }
    catch (err) {
        throw new Error(`tokenRepository createToken err: ${err.message}`);
    }
});
exports.createToken = createToken;
const deleteToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Token.destroy({
            where: { userId: id }
        });
        return;
    }
    catch (err) {
        throw new Error(`tokenRepository deleteToken err: ${err.message}`);
    }
});
exports.deleteToken = deleteToken;
const selectTokenByUid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenInfo = yield models_1.default.Token.findOne({ where: { userId: id }, raw: true });
        return tokenInfo;
    }
    catch (err) {
        throw new Error(`tokenRepository selectTokenByUid err: ${err.message}`);
    }
});
exports.selectTokenByUid = selectTokenByUid;
const selectTokenByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenInfo = yield models_1.default.Token.findOne({ where: { token: token }, raw: true });
        return refreshTokenInfo;
    }
    catch (err) {
        throw new Error(`tokenRepository selectTokenByToken Err: ${err.message}`);
    }
});
exports.selectTokenByToken = selectTokenByToken;
