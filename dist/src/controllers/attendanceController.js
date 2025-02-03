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
const http_status_codes_1 = require("http-status-codes");
const attendanceService = __importStar(require("../services/attendanceService"));
// api 예시 : http://localhost:3000/api/attendances?page=1&size=4
// 1. 전체 참석 정보 조회
const getAllAttendances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo; // 토큰에서 사용자 정보 추출
        const userId = userInfo.id;
        // 페이지네이션 파라미터 받기
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        // 페이지네이션 쓸 때
        if (page && size) {
            const result = yield attendanceService.getAllAttendances(userId, page, size);
            if ("totalItems" in result && "totalPages" in result) {
                const { allAttendances, totalItems, totalPages } = result;
                if (allAttendances && allAttendances.length > 0) {
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        allAttendances,
                        totalItems,
                        totalPages,
                        currentPage: page,
                    });
                    return;
                }
            }
        }
        // const { allAttendances, totalItems, totalPages } =
        // await attendanceService.getAllAttendances(userId, page, size);
        // if (allAttendances && allAttendances.length > 0) {
        //   res.status(StatusCodes.OK).json({
        //     allAttendances,
        //     totalItems,
        //     totalPages,
        //     currentPage: page,
        //   });
        //   return;
        else {
            // 페이지네이션 안 쓰는 전체 조회일 때
            const result = yield attendanceService.getAllAttendances(userId); // 원래 코드
            // 결과가 배열로 오면 그 데이터를 그대로 응답
            if (Array.isArray(result)) {
                if (result.length > 0) {
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        allAttendances: result,
                    });
                    return;
                }
            }
            // if ("allAttendances" in result) {
            //   const allAttendances = result.allAttendances;
            //   if (allAttendances && allAttendances.length > 0) {
            //     res.status(StatusCodes.OK).json({
            //       allAttendances: result,
            //     });
            //     return;
            //   }
        }
        res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ message: "전체 참석 정보가 존재하지 않습니다." });
        // if (!userInfo) {
        //   res
        //     .status(StatusCodes.UNAUTHORIZED)
        //     .json({ message: "인증에 실패하였습니다. 토큰값을 확인해주세요." });
        //   return;
        // }
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "서버 에러, 서버를 다시 확인해주세요." });
    }
});
exports.getAllAttendances = getAllAttendances;
// 2. 개인 참석 정보 조회
const getMyAttendance = (req, // Request의 제네릭 타입 지정
res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, contact } = req.body;
    try {
        const attendance = yield attendanceService.getMyAttendance(id, name, contact);
        if (attendance) {
            res.status(http_status_codes_1.StatusCodes.OK).json(attendance);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "참석 정보가 없습니다. 이름과 이메일을 다시 확인해주세요.",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
    }
});
exports.getMyAttendance = getMyAttendance;
// 3. 개인 참석 정보 등록
const postMyAttendance = (req, // Request에 Body 타입 지정
res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, invitationId, name, contact, isDining, attendance, isGroomSide, isBrideSide, companions, } = req.body;
    try {
        yield attendanceService.postMyAttendance({
            userId,
            invitationId,
            name,
            contact,
            isDining,
            attendance,
            isGroomSide,
            isBrideSide,
            companions,
        });
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: "결혼식 참석 여부가 [참석]으로 등록되었습니다." });
    }
    catch (err) {
        console.error(err);
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: err.message || "서버 에러" });
    }
});
exports.postMyAttendance = postMyAttendance;
// 4. 개인 참석 정보 삭제     // 이름과 연락처
const deleteMyAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, contact } = req.body;
    try {
        const result = yield attendanceService.deleteMyAttendance(id, name, contact);
        if (result) {
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: "참석 여부가 [불참]으로 변경되었습니다." });
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: "참석 정보가 없거나 정보가 일치하지 않습니다." });
        }
    }
    catch (err) {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "서버 에러" });
    }
});
exports.deleteMyAttendance = deleteMyAttendance;
