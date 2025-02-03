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
exports.deleteMyAttendance = exports.postMyAttendance = exports.getMyAttendance = exports.getAllAttendances = void 0;
const attendanceRepository = __importStar(require("../repositories/attendanceRepository"));
// 1. 전체 참석 정보 조회
const getAllAttendances = (userId, page, size) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 시작 위치 계산
        const offset = (page - 1) * size;
        const limit = size;
        // repo 호출
        const allAttendances = yield attendanceRepository.findAllAttendances(userId, offset, limit);
        // 전체 데이터 개수 및 총 페이지 계산
        const totalItems = yield attendanceRepository.countAttendances(userId);
        const totalPages = Math.ceil(totalItems / size);
        return {
            allAttendances,
            totalItems,
            totalPages,
        };
        // return await attendanceRepository.findAllAttendances(userId);    // 원래 코드
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`모든 참석 정보 기록을 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.getAllAttendances = getAllAttendances;
// 2. 개인 참석 정보 조회
const getMyAttendance = (id, name, contact) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield attendanceRepository.findMyAttendanceByParamsId(id, name, contact);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`아이디 ${id}, 이름 ${name}, 연락처 ${contact}의 참석 정보를 불러오는 것에 실패했습니다. : ${errorMessage}`);
    }
});
exports.getMyAttendance = getMyAttendance;
// 3. 개인 참석 정보 등록
const postMyAttendance = (attendanceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield attendanceRepository.createMyAttendance(attendanceData);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`참석 정보 등록에 실패했습니다. : ${errorMessage}`);
    }
});
exports.postMyAttendance = postMyAttendance;
// 4. 개인 참석 정보 삭제
const deleteMyAttendance = (id, name, contact) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield attendanceRepository.removeMyAttendanceByContact(id, name, contact);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        throw new Error(`다음 이름과 이메일로 기록된 참석 정보 삭제에 실패했습니다. name: ${name}, contact: ${contact} : ${errorMessage}`);
    }
});
exports.deleteMyAttendance = deleteMyAttendance;
