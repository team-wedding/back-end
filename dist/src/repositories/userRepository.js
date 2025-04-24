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
exports.updateEmail = exports.updateName = exports.updateAllUserInfo = exports.updatePassword = exports.deleteUser = exports.createUser = exports.selectUser = void 0;
const models_1 = __importDefault(require("../models"));
const selectUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield models_1.default.User.findOne({ where: { email: email }, raw: true });
        return userInfo;
    }
    catch (err) {
        throw new Error(`userRepository selectUser err: ${err.message}`);
    }
});
exports.selectUser = selectUser;
const createUser = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.User.create({
            name: userInfo.name,
            email: userInfo.email,
            hashPassword: userInfo.hashPassword,
            provider: userInfo.provider,
            salt: userInfo.salt
        });
    }
    catch (err) {
        throw new Error(`userRepository createUser err: ${err.message}`);
    }
});
exports.createUser = createUser;
const deleteUser = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.User.destroy({ where: { id: userInfo.id } });
        return true;
    }
    catch (err) {
        throw new Error(`userReposityro deleteUser err: ${err.message}`);
    }
});
exports.deleteUser = deleteUser;
const updatePassword = (id, newHashPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.User.update({
            hashPassword: newHashPassword,
            salt: salt
        }, {
            where: { id: id }
        });
        return true;
    }
    catch (err) {
        throw new Error(`userRepository updatePassword err: ${err.message}`);
    }
});
exports.updatePassword = updatePassword;
const updateAllUserInfo = (id, newName, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.User.update({
            name: newName,
            email: newEmail
        }, {
            where: { id: id }
        });
        return true;
    }
    catch (err) {
        console.log(err);
        throw new Error(`userRepository updateAllUserInfo err: ${err.message}`);
    }
});
exports.updateAllUserInfo = updateAllUserInfo;
const updateName = (id, newName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.User.update({
            name: newName,
        }, {
            where: { id: id }
        });
        return true;
    }
    catch (err) {
        console.log(err);
        throw new Error(`userRepository updateName err: ${err.message}`);
    }
});
exports.updateName = updateName;
const updateEmail = (id, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.User.update({
            email: newEmail
        }, {
            where: { id: id }
        });
        return true;
    }
    catch (err) {
        console.log(err);
        throw new Error(`userRepository updateEmail err: ${err.message}`);
    }
});
exports.updateEmail = updateEmail;
