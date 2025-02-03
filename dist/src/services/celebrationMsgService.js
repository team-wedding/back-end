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
const celebrationMsgRepository = __importStar(require("../repositories/celebrationMsgRepository"));
// 1. 전체 축하메세지 정보 조회 + get
const getAllCelebrationMsgs = (userId, page, size) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 시작 위치 계산
        const offset = (page - 1) * size;
        const limit = size;
        // repo 호출
        const allCelebrationMsgs = yield celebrationMsgRepository.findAllcelebrationMsgs(userId, offset, limit);
        // 전체 데이터 개수 및 총 페이지 계산
        const totalItems = yield celebrationMsgRepository.countCelebrationMsgs(userId);
        const totalPages = Math.ceil(totalItems / size);
        return {
            allCelebrationMsgs,
            totalItems,
            totalPages,
        };
        // return await celebrationMsgRepository.findAllcelebrationMsgs(userId);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`모든 축하메세지 정보 기록을 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.getAllCelebrationMsgs = getAllCelebrationMsgs;
// 2. 개인이 작성한 축하메세지 조회 + get
const getMyCelebrationMsg = (id, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield celebrationMsgRepository.findMyCelebrationMsgByPassword(id, name, password);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`아이디 ${id}, 이름 ${name}, 비밀번호 ${password}의 축하메세지 정보를 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.getMyCelebrationMsg = getMyCelebrationMsg;
// 3. 개인이 작성한 축하메세지 등록 + post
const postMyCelebrationMsg = (celebrationMsgData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield celebrationMsgRepository.createMyCelebrationMsg(celebrationMsgData);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`축하메세지 정보 등록에 실패했습니다. : ${errorMessage}`);
    }
});
exports.postMyCelebrationMsg = postMyCelebrationMsg;
// 4. 개인이 작성한 축하메세지 수정 + put
const putMyCelebrationMsg = (id, name, password, newMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield celebrationMsgRepository.updateCelebrationMsgByPassword(id, name, password, newMessage);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`축하메세지 정보 수정에 실패했습니다. : ${errorMessage}`);
    }
});
exports.putMyCelebrationMsg = putMyCelebrationMsg;
// 5. 개인이 작성한 축하메세지 삭제 + delete
const deleteMyCelebrationMsg = (id, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield celebrationMsgRepository.removeMyCelebrationMsgByPassword(id, name, password);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`다음 이름과 비밀번호로 기록된 축하메세지 정보 삭제에 실패했습니다. name : ${name}, password : ${password} : ${errorMessage}`);
    }
});
exports.deleteMyCelebrationMsg = deleteMyCelebrationMsg;
