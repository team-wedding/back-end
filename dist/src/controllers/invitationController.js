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
exports.getInvitations = exports.deleteInvitation = exports.putInvitation = exports.getInvitation = exports.postInvitation = void 0;
const http_status_codes_1 = require("http-status-codes");
const invitationService = __importStar(require("../services/invitationService"));
const error_1 = require("../utils/error");
const validateIdParam = (param) => {
    const id = Number(param);
    if (isNaN(id)) {
        throw new Error('유효하지 않은 ID입니다.');
    }
    return id;
};
const postInvitation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitationData = req.body; // 요청 본문에서 청첩장 데이터를 추출
        const userInfo = req.userInfo; // 토큰에서 사용자 정보 추출
        invitationData.userId = userInfo.id; // invitationData에 userId 설정
        const { calendars, maps, galleries, accounts, contacts, notices } = req.body; // 선택 정보 데이터 추출
        const result = yield invitationService.createInvitation(userInfo.id, invitationData, calendars, maps, galleries, accounts, contacts, notices);
        if (result) {
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: '청첩장이 생성되었습니다.'
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: '청첩장 생성 실패.'
        });
    }
    catch (err) {
        if (err instanceof error_1.ClientError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: err.message });
            return;
        }
        else {
            next(err);
        }
    }
});
exports.postInvitation = postInvitation;
const getInvitation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitationId = validateIdParam(req.params.id);
        const invitation = yield invitationService.getInvitationById(invitationId);
        if (invitation) {
            res.status(http_status_codes_1.StatusCodes.OK).json(invitation);
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json([]);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
});
exports.getInvitation = getInvitation;
const putInvitation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitationId = validateIdParam(req.params.id);
        const userInfo = req.userInfo; // 토큰에서 가져온 userInfo
        const updatedData = req.body;
        const { calendars, maps, galleries, accounts, contacts, notices } = req.body; // 선택 정보 데이터 추출
        if (!userInfo || !userInfo.id) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: '토큰이 없습니다.' });
            return;
        }
        const isUpdated = yield invitationService.updateInvitation(userInfo.id, invitationId, updatedData, calendars, maps, galleries, accounts, contacts, notices);
        if (isUpdated) {
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '청첩장이 수정되었습니다.' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '변경된 내용이 없습니다.' });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
});
exports.putInvitation = putInvitation;
const deleteInvitation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitationId = validateIdParam(req.params.id);
        const userInfo = req.userInfo;
        if (!userInfo || !userInfo.id) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: '토큰이 없습니다.' });
            return;
        }
        const isDeleted = yield invitationService.deleteInvitation(userInfo.id, invitationId);
        if (isDeleted) {
            res.status(http_status_codes_1.StatusCodes.OK).json({ message: '청첩장이 삭제되었습니다.' });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: '청첩장 삭제 실패.' });
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
});
exports.deleteInvitation = deleteInvitation;
const getInvitations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.userInfo;
        const invitations = yield invitationService.getInvitationsByUserId(userInfo.id);
        if (invitations && invitations.length > 0) {
            res.status(http_status_codes_1.StatusCodes.OK).json(invitations);
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json([]);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: '해당 청첩장이 없습니다' });
        next(err);
    }
});
exports.getInvitations = getInvitations;
