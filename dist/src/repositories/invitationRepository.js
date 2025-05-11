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
exports.deleteNotice = exports.deleteContact = exports.deleteAccount = exports.deleteGallery = exports.deleteMap = exports.deleteCalendar = exports.deleteInvitation = exports.updateNotice = exports.updateContact = exports.updateAccount = exports.updateGallery = exports.updateMap = exports.updateCalendar = exports.updateInvitation = exports.getInvitationsByUserId = exports.getInvitationById = exports.createNotice = exports.createContact = exports.createAccount = exports.createGallery = exports.createMap = exports.createCalendar = exports.createInvitation = void 0;
const models_1 = __importDefault(require("../models"));
const createInvitation = (invitationData, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Invitation.create(invitationData, { transaction }); // db.Invitation으로 접근
    }
    catch (err) {
        throw new Error(`청첩장 등록 에러: ${err.message}`);
    }
});
exports.createInvitation = createInvitation;
const createCalendar = (calendars, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Calendar.bulkCreate(calendars, { transaction });
    }
    catch (err) {
        throw new Error(`캘린더 등록 에러: ${err.message}`);
    }
});
exports.createCalendar = createCalendar;
const createMap = (maps, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Map.bulkCreate(maps, { transaction });
    }
    catch (err) {
        throw new Error(`지도, 교통수단 등록 에러: ${err.message}`);
    }
});
exports.createMap = createMap;
const createGallery = (galleries, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Gallery.bulkCreate(galleries, { transaction });
    }
    catch (err) {
        throw new Error(`갤러리 등록 에러: ${err.message}`);
    }
});
exports.createGallery = createGallery;
const createAccount = (accounts, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Account.bulkCreate(accounts, { transaction });
    }
    catch (err) {
        throw new Error(`계좌 등록 에러: ${err.message}`);
    }
});
exports.createAccount = createAccount;
const createContact = (contacts, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Contact.bulkCreate(contacts, { transaction });
    }
    catch (err) {
        throw new Error(`연락처 등록 에러: ${err.message}`);
    }
});
exports.createContact = createContact;
const createNotice = (notices, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Notice.bulkCreate(notices, { transaction });
    }
    catch (err) {
        throw new Error(`공지사항 등록 에러: ${err.message}`);
    }
});
exports.createNotice = createNotice;
const getInvitationById = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield models_1.default.Invitation.findOne({
            where: { id: invitationId },
            include: [
                {
                    model: models_1.default.Calendar,
                    as: 'calendars',
                    required: false,
                },
                {
                    model: models_1.default.Map,
                    as: 'maps',
                    required: false,
                },
                {
                    model: models_1.default.Gallery,
                    as: 'galleries',
                    required: false,
                },
                {
                    model: models_1.default.Account,
                    as: 'accounts',
                    required: false,
                },
                {
                    model: models_1.default.Contact,
                    as: 'contacts',
                    required: false,
                },
                {
                    model: models_1.default.Notice,
                    as: 'notices',
                    required: false,
                },
            ],
        });
    }
    catch (err) {
        throw new Error(`청첩장 조회 에러: ${err.message}`);
    }
});
exports.getInvitationById = getInvitationById;
const getInvitationsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // userId로 먼저 테이블을 조회하고 해당 테이블의 id를 반환하여 연결된 테이블들을 join
    try { // userId로 테이블 조회
        const invitations = yield models_1.default.Invitation.findAll({
            where: { userId },
            raw: true,
        });
        if (invitations && invitations.length > 0) { // 테이블이 있으면 invitationId로 다른 테이블들을 join
            const invitationIds = invitations.map((invitation) => invitation.id);
            return yield models_1.default.Invitation.findAll({
                where: { id: invitationIds },
                include: [
                    {
                        model: models_1.default.GuestInfo,
                        as: 'guestInfos',
                        required: false,
                    },
                    {
                        model: models_1.default.CelebrationMsg,
                        as: 'celebrationMsgs',
                        required: false,
                    },
                    {
                        model: models_1.default.Calendar,
                        as: 'calendars',
                        required: false,
                    },
                    {
                        model: models_1.default.Map,
                        as: 'maps',
                        required: false,
                    },
                    {
                        model: models_1.default.Gallery,
                        as: 'galleries',
                        required: false,
                    },
                    {
                        model: models_1.default.Account,
                        as: 'accounts',
                        required: false,
                    },
                    {
                        model: models_1.default.Contact,
                        as: 'contacts',
                        required: false,
                    },
                    {
                        model: models_1.default.Notice,
                        as: 'notices',
                        required: false,
                    },
                ],
            });
        }
    }
    catch (err) {
        throw new Error(`사용자 청첩장 조회 에러: ${err.message}`);
    }
});
exports.getInvitationsByUserId = getInvitationsByUserId;
const updateInvitation = (invitationId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [affectedRows] = yield models_1.default.Invitation.update(updatedData, {
            where: { id: invitationId },
        });
        return affectedRows > 0;
    }
    catch (err) {
        throw new Error(`청첩장 수정 에러: ${err.message}`);
    }
});
exports.updateInvitation = updateInvitation;
const updateCalendar = (invitationId, calendarData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Calendar.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제
        const [newCalendars] = yield models_1.default.Calendar.bulkCreate(// 삭제 후 다시 생성(없으면 자동 생성)
        calendarData.map((calendar) => (Object.assign(Object.assign({}, calendar), { invitationId }))));
        return newCalendars > 0;
    }
    catch (err) {
        throw new Error(`캘린더 수정 에러: ${err.message}`);
    }
});
exports.updateCalendar = updateCalendar;
const updateMap = (invitationId, mapData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Map.destroy({ where: { invitationId } }); // 기존 데이터 삭제
        const [newMaps] = yield models_1.default.Map.bulkCreate(mapData.map((map) => (Object.assign(Object.assign({}, map), { invitationId }))));
        return newMaps > 0;
    }
    catch (err) {
        throw new Error(`지도, 교통수단 수정 에러: ${err.message}`);
    }
});
exports.updateMap = updateMap;
const updateGallery = (invitationId, galleryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Gallery.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제
        const [newGalleries] = yield models_1.default.Gallery.bulkCreate(// 삭제 후 다시 생성(없으면 자동 생성)
        galleryData.map((gallery) => (Object.assign(Object.assign({}, gallery), { invitationId }))));
        return newGalleries > 0;
    }
    catch (err) {
        throw new Error(`갤러리 수정 에러: ${err.message}`);
    }
});
exports.updateGallery = updateGallery;
const updateAccount = (invitationId, accountData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Account.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제
        const [newAccounts] = yield models_1.default.Account.bulkCreate(// 삭제 후 다시 생성(없으면 자동 생성)
        accountData.map((account) => (Object.assign(Object.assign({}, account), { invitationId }))));
        return newAccounts > 0;
    }
    catch (err) {
        throw new Error(`계좌 수정 에러: ${err.message}`);
    }
});
exports.updateAccount = updateAccount;
const updateContact = (invitationId, contactData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Contact.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제
        const [newContacts] = yield models_1.default.Contact.bulkCreate(// 삭제 후 다시 생성(없으면 자동 생성)
        contactData.map((contact) => (Object.assign(Object.assign({}, contact), { invitationId }))));
        return newContacts > 0;
    }
    catch (err) {
        throw new Error(`연락처 수정 에러: ${err.message}`);
    }
});
exports.updateContact = updateContact;
const updateNotice = (invitationId, noticeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Notice.destroy({ where: { invitationId } }); // 데이터가 있으면 기존 데이터 삭제
        const [newNotices] = yield models_1.default.Notice.bulkCreate(// 삭제 후 다시 생성(없으면 자동 생성)
        noticeData.map((notice) => (Object.assign(Object.assign({}, notice), { invitationId }))));
        return newNotices > 0;
    }
    catch (err) {
        throw new Error(`공지사항 수정 에러: ${err.message}`);
    }
});
exports.updateNotice = updateNotice;
const deleteInvitation = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Invitation.destroy({
            where: { id: invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`청첩장 삭제 에러: ${err.message}`);
    }
});
exports.deleteInvitation = deleteInvitation;
const deleteCalendar = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Calendar.destroy({
            where: { invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`캘린더 삭제 에러: ${err.message}`);
    }
});
exports.deleteCalendar = deleteCalendar;
const deleteMap = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Map.destroy({
            where: { invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`지도, 교통수단 삭제 에러: ${err.message}`);
    }
});
exports.deleteMap = deleteMap;
const deleteGallery = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Gallery.destroy({
            where: { invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`갤러리 삭제 에러: ${err.message}`);
    }
});
exports.deleteGallery = deleteGallery;
const deleteAccount = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Account.destroy({
            where: { invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`계좌 삭제 에러: ${err.message}`);
    }
});
exports.deleteAccount = deleteAccount;
const deleteContact = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Contact.destroy({
            where: { invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`연락처 삭제 에러: ${err.message}`);
    }
});
exports.deleteContact = deleteContact;
const deleteNotice = (invitationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Notice.destroy({
            where: { invitationId },
        });
        return true;
    }
    catch (err) {
        throw new Error(`공지사항 삭제 에러: ${err.message}`);
    }
});
exports.deleteNotice = deleteNotice;
