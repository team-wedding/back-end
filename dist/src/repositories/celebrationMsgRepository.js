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
exports.removeCelebrationMsgByAdmin = exports.removeMyCelebrationMsgByPassword = exports.updateCelebrationMsgByPassword = exports.createMyCelebrationMsg = exports.findMyCelebrationMsgByPassword = exports.countCelebrationMsgsForGuest = exports.countCelebrationMsgs = exports.findAllcelebrationMsgsForGuest = exports.findAllcelebrationMsgs = void 0;
const models_1 = __importDefault(require("../models"));
const celebrationMsg_1 = __importDefault(require("../models/celebrationMsg"));
// 1. 전체 축하메세지 정보 조회
const findAllcelebrationMsgs = (userId, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("모든 축하메세지 기록을 불러오는 중입니다...");
        const celebrationMsg = yield models_1.default.CelebrationMsg.findAll({
            where: { userId },
            offset,
            limit,
            order: [["id", "DESC"]],
        });
        if (!celebrationMsg) {
            console.log("전체 축하메세지 정보가 없습니다.");
        }
        console.log("모든 축하메세지 기록이 불러와졌습니다. : ", celebrationMsg);
        return celebrationMsg;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`모든 축하메세지 정보 기록을 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.findAllcelebrationMsgs = findAllcelebrationMsgs;
// 1-1 전체 축하메세지 정보 조회 (하객용)
const findAllcelebrationMsgsForGuest = (userId, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("모든 축하메세지 기록을 불러오는 중입니다...");
        const celebrationMsg = yield models_1.default.CelebrationMsg.findAll({
            where: { userId },
            offset,
            limit,
            order: [["id", "DESC"]],
        });
        if (!celebrationMsg) {
            console.log("전체 축하메세지 정보가 없습니다.");
        }
        console.log("모든 축하메세지 기록이 불러와졌습니다. : ", celebrationMsg);
        return celebrationMsg;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`모든 축하메세지 정보 기록을 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.findAllcelebrationMsgsForGuest = findAllcelebrationMsgsForGuest;
// 개수 세기
const countCelebrationMsgs = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield celebrationMsg_1.default.count({
        where: { userId },
    });
});
exports.countCelebrationMsgs = countCelebrationMsgs;
// 개수 세기 (하객용)
const countCelebrationMsgsForGuest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield celebrationMsg_1.default.count({
        where: { userId },
    });
});
exports.countCelebrationMsgsForGuest = countCelebrationMsgsForGuest;
// 2. 개인이 작성한 축하메세지 조회
const findMyCelebrationMsgByPassword = (id, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`아이디 ${id}, 이름 ${name}, 비밀번호 ${password}에 해당하는 개인 축하메세지 정보를 불러오는 중입니다..`);
        const celebrationMsg = yield models_1.default.CelebrationMsg.findOne({
            where: { id, name, password },
        });
        if (!celebrationMsg) {
            console.warn(`아이디 ${id}, 이름 ${name}, 비밀번호 ${password}에 해당하는 축하메세지 정보가 없습니다.`);
        }
        return celebrationMsg;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`아이디 ${id}, 이름 ${name}, 비밀번호 ${password}의 축하메세지 정보를 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.findMyCelebrationMsgByPassword = findMyCelebrationMsgByPassword;
// 3. 개인이 작성한 축하메세지 생성
const createMyCelebrationMsg = (celebrationMsgData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const celebrationMsg = yield models_1.default.CelebrationMsg.create({
            userId: celebrationMsgData.userId,
            invitationId: celebrationMsgData.invitationId,
            name: celebrationMsgData.name,
            password: celebrationMsgData.password,
            imageUrl: celebrationMsgData.imageUrl,
            message: celebrationMsgData.message,
            createdAt: celebrationMsgData.createdAt,
            updatedAt: celebrationMsgData.updatedAt,
        });
        if (!celebrationMsg) {
            console.log("축하메세지 정보 등록에 필요한 정보를 생성하지 못했습니다.");
        }
        return celebrationMsg;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`축하메세지 정보 등록에 실패했습니다. : ${errorMessage}`);
    }
});
exports.createMyCelebrationMsg = createMyCelebrationMsg;
// 4. 개인이 작성한 축하메세지 수정 + put
const updateCelebrationMsgByPassword = (id, name, password, newMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`다음 이름과 비밀번호를 통해 축하메세지 수정 시도중입니다..`);
        const celebrationMsg = yield models_1.default.CelebrationMsg.findOne({
            where: { id },
        });
        if (celebrationMsg) {
            celebrationMsg.message = newMessage;
            celebrationMsg.name = name;
            celebrationMsg.password = password;
            const updatedCelebrationMsg = yield celebrationMsg.save();
            console.log(`다음 이름과 비밀번호로 기록된 축하메세지 정보가 성공적으로 수정되었습니다. id : ${id}, name : ${name}, password : ${password}.`);
            return updatedCelebrationMsg;
        }
        else {
            console.log(`입력된 아이디, 이름, 비밀번호에 만족하는 축하메세지가 존재하지 않습니다. id : ${id} name : ${name}, passoword : ${password}`);
            return null;
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`축하메세지 정보 수정에 실패했습니다. : ${errorMessage}`);
    }
});
exports.updateCelebrationMsgByPassword = updateCelebrationMsgByPassword;
// 5. 개인이 작성한 축하메세지 삭제 + delete
const removeMyCelebrationMsgByPassword = (id, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`다음 이름과 비밀번호를 통해 축하메세지 정보 삭제 시도중입니다.. name : ${name}, password : ${password}`);
        const celebrationMsg = yield models_1.default.CelebrationMsg.findOne({
            where: { id, name, password },
        });
        if (!celebrationMsg) {
            console.warn(`다음 이름과 비밀번호로 기록된 축하메세지 정보가 없습니다. name : ${name}, password : ${password}`);
            return false;
        }
        yield models_1.default.CelebrationMsg.destroy({ where: { id, name, password } });
        console.log(`다음 이름과 비밀번호로 기록된 축하메세지 정보가 성공적으로 삭제되었습니다. name : ${name}, password : ${password}.`);
        return true;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`다음 이름과 비밀번호로 기록된 축하메세지 정보 삭제에 실패했습니다. name : ${name}, password : ${password} : ${errorMessage}`);
    }
});
exports.removeMyCelebrationMsgByPassword = removeMyCelebrationMsgByPassword;
// 6. 관리자 모드 포토톡 삭제 기능 + delete
const removeCelebrationMsgByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const celebrationMsg = yield models_1.default.CelebrationMsg.findOne({
            where: { id },
        });
        if (!celebrationMsg) {
            console.log(`다음 관리자 아이디로 삭제할 축하메세지 정보가 없습니다. id : ${id}`);
            return false;
        }
        yield models_1.default.CelebrationMsg.destroy({ where: { id } });
        console.log(`다음 관리자 아이디로 해당 축하메세지 정보를 성공적으로 삭제했습니다. id : ${id}`);
        return true;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`다음 관리자 아이디로 해당 축하메세지 정보 삭제에 실패했습니다. (id : ${id}) : ${errorMessage}`);
    }
});
exports.removeCelebrationMsgByAdmin = removeCelebrationMsgByAdmin;
