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
exports.getInvitationsByUserId = exports.deleteInvitation = exports.updateInvitation = exports.getInvitationById = exports.createInvitation = void 0;
const invitationRepository = __importStar(require("../repositories/invitationRepository"));
const error_1 = require("../utils/error");
const invitation_1 = __importDefault(require("../models/invitation"));
const models_1 = __importDefault(require("../models"));
const createInvitation = (userId, invitationData, calendars, maps, galleries, accounts, contacts, notices) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield models_1.default.sequelize.transaction();
    try {
        const newInvitation = yield invitationRepository.createInvitation(Object.assign(Object.assign({}, invitationData), { userId }), transaction);
        if (calendars && calendars.length > 0) { // 캘린더 정보가 들어오면 저장
            const calendarsWithInvitationId = calendars.map((calendar) => (Object.assign(Object.assign({}, calendar), { invitationId: newInvitation.id })));
            yield invitationRepository.createCalendar(calendarsWithInvitationId, transaction);
        }
        if (maps && maps.length > 0) { // 지도, 교통수단 정보가 들어오면 저장
            const mapsWithInvitationId = maps.map((map) => (Object.assign(Object.assign({}, map), { invitationId: newInvitation.id })));
            yield invitationRepository.createMap(mapsWithInvitationId, transaction);
        }
        if (galleries && galleries.length > 0) { // 갤러리 정보가 들어오면 저장
            if (galleries.some(gallery => { var _a; return ((_a = gallery.images) !== null && _a !== void 0 ? _a : []).length > 9; })) {
                throw new error_1.ClientError("갤러리의 이미지 개수는 최대 9개까지만 가능합니다.");
            }
            const galleriesWithInvitationId = galleries.map((gallery) => (Object.assign(Object.assign({}, gallery), { invitationId: newInvitation.id })));
            yield invitationRepository.createGallery(galleriesWithInvitationId, transaction);
        }
        if (accounts && accounts.length > 0) { // 계좌 정보가 들어오면 저장
            const accountsWithInvitationId = accounts.map((account) => (Object.assign(Object.assign({}, account), { invitationId: newInvitation.id })));
            yield invitationRepository.createAccount(accountsWithInvitationId, transaction);
        }
        if (contacts && contacts.length > 0) { // 연락처 정보가 들어오면 저장
            const contactsWithInvitationId = contacts.map((contact) => (Object.assign(Object.assign({}, contact), { invitationId: newInvitation.id })));
            yield invitationRepository.createContact(contactsWithInvitationId, transaction);
        }
        if (notices && notices.length > 0) { // 공지사항 정보가 들어오면 저장
            const noticesWithInvitationId = notices.map((notice) => (Object.assign(Object.assign({}, notice), { invitationId: newInvitation.id })));
            yield invitationRepository.createNotice(noticesWithInvitationId, transaction);
        }
        yield transaction.commit();
        return { id: newInvitation.id };
    }
    catch (err) {
        if (transaction) {
            yield transaction.rollback();
            console.error('청첩장 등록 에러:', err.message);
        }
        if (err instanceof error_1.ClientError) { // ClientError의 경우 따로 처리
            throw err;
        }
        throw new Error('청첩장 등록 에러');
    }
});
exports.createInvitation = createInvitation;
const getInvitationById = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitation = yield invitationRepository.getInvitationById(invitationId);
        return invitation || null;
    }
    catch (err) {
        console.error('청첩장 조회 에러:', err.message);
        throw new Error('청첩장 조회 에러');
    }
});
exports.getInvitationById = getInvitationById;
const updateInvitation = (userId, invitationId, updatedData, calendars, maps, galleries, accounts, contacts, notices) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitation = yield invitationRepository.getInvitationById(invitationId);
        // 필드 체크
        const attributes = invitation_1.default.getAttributes();
        const requiredFields = Object.keys(attributes).filter((field) => attributes[field].allowNull === true);
        const missingFields = requiredFields.filter(field => !(field in updatedData));
        if (missingFields.length > 0) {
            throw new error_1.ValidationError(`청첩장 필수 값이 누락되었습니다: ${missingFields.join(', ')}`);
        }
        ;
        if (!invitation) {
            throw new Error('해당 청첩장이 없습니다');
        }
        if (invitation.userId !== userId) {
            throw new Error('권한이 없어 수정할 수 없습니다');
        }
        let isUpdated = false;
        const invitationUpdated = yield invitationRepository.updateInvitation(invitationId, updatedData);
        if (invitationUpdated) {
            isUpdated = true;
        }
        if (calendars && calendars.length > 0) {
            const updatedCalendars = yield invitationRepository.updateCalendar(invitationId, calendars);
            if (updatedCalendars) {
                isUpdated = true;
            }
        }
        if (maps && maps.length > 0) {
            const updatedMaps = yield invitationRepository.updateMap(invitationId, maps);
            if (updatedMaps) {
                isUpdated = true;
            }
        }
        if (galleries && galleries.length > 0) {
            const updatedGalleries = yield invitationRepository.updateGallery(invitationId, galleries);
            if (updatedGalleries) {
                isUpdated = true;
            }
        }
        if (accounts && accounts.length > 0) {
            const updatedAccounts = yield invitationRepository.updateAccount(invitationId, accounts);
            if (updatedAccounts) {
                isUpdated = true;
            }
        }
        if (contacts && contacts.length > 0) {
            const updatedContacts = yield invitationRepository.updateContact(invitationId, contacts);
            if (updatedContacts) {
                isUpdated = true;
            }
        }
        if (notices && notices.length > 0) {
            const updatedNotices = yield invitationRepository.updateNotice(invitationId, notices);
            if (updatedNotices) {
                isUpdated = true;
            }
        }
        return isUpdated;
    }
    catch (err) {
        if (err instanceof error_1.ValidationError) {
            throw err;
        }
        console.error('청첩장 수정 에러:', err.message);
        throw new Error('청첩장 수정 에러');
    }
});
exports.updateInvitation = updateInvitation;
const deleteInvitation = (userId, invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitation = yield invitationRepository.getInvitationById(invitationId);
        if (!invitation) {
            throw new Error('해당 청첩장이 없습니다');
        }
        if (invitation.userId !== userId) {
            throw new Error('권한이 없어 삭제할 수 없습니다');
        }
        const isCalendarDeleted = yield invitationRepository.deleteCalendar(invitationId);
        const isMapDeleted = yield invitationRepository.deleteMap(invitationId);
        const isAccountDeleted = yield invitationRepository.deleteAccount(invitationId);
        const isContactDeleted = yield invitationRepository.deleteContact(invitationId);
        const isGalleryDeleted = yield invitationRepository.deleteGallery(invitationId);
        const isNoticeDeleted = yield invitationRepository.deleteNotice(invitationId);
        if (isCalendarDeleted && isAccountDeleted && isContactDeleted && isGalleryDeleted && isMapDeleted && isNoticeDeleted) {
            const isInvitationDeleted = yield invitationRepository.deleteInvitation(invitationId);
            return isInvitationDeleted;
        }
        return false;
    }
    catch (err) {
        console.error('청첩장 삭제 에러:', err.message);
        throw new Error('청첩장 삭제 에러');
    }
});
exports.deleteInvitation = deleteInvitation;
const getInvitationsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invitations = yield invitationRepository.getInvitationsByUserId(userId);
        return invitations || [];
    }
    catch (err) {
        console.error('청첩장 조회 에러:', err.message);
        throw new Error('청첩장 조회 에러');
    }
});
exports.getInvitationsByUserId = getInvitationsByUserId;
