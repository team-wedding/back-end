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
exports.removeMyAttendanceByContact = exports.createMyAttendance = exports.findMyAttendanceByParamsId = exports.countAttendances = exports.findAllAttendances = void 0;
const models_1 = __importDefault(require("../models"));
const guestInfo_1 = __importDefault(require("../models/guestInfo"));
// 1. 전체 참석 정보 조회
const findAllAttendances = (userId, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (offset !== undefined && limit !== undefined) {
            return yield models_1.default.GuestInfo.findAll({
                where: { userId },
                offset,
                limit,
                order: [["id", "DESC"]],
            });
        }
        return yield models_1.default.GuestInfo.findAll({ where: { userId } });
    }
    catch (error) {
        throw new Error(`모든 참석 정보 기록을 불러오는 것에 실패했습니다. : ${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    }
});
exports.findAllAttendances = findAllAttendances;
// 개수 세기
const countAttendances = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield guestInfo_1.default.count({
        where: { userId },
    });
});
exports.countAttendances = countAttendances;
// 2. 개인 참석 정보 조회
const findMyAttendanceByParamsId = (id, name, contact) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`아이디 ${id}, 이름 ${name}, 연락처 ${contact}에 해당하는 개인 참석 정보를 불러오는 중입니다...`);
        const attendance = yield models_1.default.GuestInfo.findOne({
            where: { id, name, contact },
        });
        if (!attendance) {
            console.log(`아이디 ${id}, 이름 ${name}, 연락처 ${contact}에 해당하는 참석 정보가 없습니다.`);
        }
        return attendance;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`아이디 ${id}, 이름 ${name}, 연락처 ${contact}의 참석 정보를 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.findMyAttendanceByParamsId = findMyAttendanceByParamsId;
// 3. 개인 참석 정보 생성
const createMyAttendance = (attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield models_1.default.GuestInfo.create({
            userId: attendanceData.userId,
            invitationId: attendanceData.invitationId,
            name: attendanceData.name,
            contact: attendanceData.contact,
            isDining: attendanceData.isDining,
            attendance: attendanceData.attendance,
            isGroomSide: attendanceData.isGroomSide,
            isBrideSide: attendanceData.isBrideSide,
            companions: attendanceData.companions,
        });
        if (!attendance) {
            console.log("참석 정보 등록에 필요한 정보를 생성하지 못했습니다.");
        }
        return attendance;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`참석 정보 등록에 실패했습니다. : ${errorMessage}`);
    }
});
exports.createMyAttendance = createMyAttendance;
// 4. 개인 참석 정보 삭제   // 이름 + 연락처
const removeMyAttendanceByContact = (id, name, contact) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`다음 이름과 연락처를 통해 참석 정보 삭제 시도중입니다.. name: ${name}, contact: ${contact}`);
        const attendance = yield models_1.default.GuestInfo.findOne({
            where: { id, name, contact },
        });
        if (!attendance) {
            console.warn(`다음 이름과 이메일로 기록된 참석 정보가 없습니다. name: ${name}, contact: ${contact}`);
            return false;
        }
        yield models_1.default.GuestInfo.destroy({ where: { name, contact } });
        console.log(`다음 이름과 이메일로 기록된 참석 정보가 성공적으로 삭제되었습니다. name: ${name}, contact: ${contact}.`);
        return true;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`다음 이름과 이메일로 기록된 참석 정보 삭제에 실패했습니다. name: ${name}, contact: ${contact} : ${errorMessage}`);
    }
});
exports.removeMyAttendanceByContact = removeMyAttendanceByContact;
