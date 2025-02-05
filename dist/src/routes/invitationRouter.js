"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const invitationController_1 = require("../controllers/invitationController");
const authToken_1 = require("../middlewares/authToken");
;
router.post('/', authToken_1.authToken, invitationController_1.postInvitation);
router.get('/', authToken_1.authToken, invitationController_1.getInvitations);
// params로 id를 받아오는 router들은 타입을 지정해줘야 함
router.get('/:id', (req, res, next) => {
    (0, invitationController_1.getInvitation)(req, res, next);
});
router.put('/:id', authToken_1.authToken, (req, res, next) => {
    (0, invitationController_1.putInvitation)(req, res, next);
});
router.delete('/:id', authToken_1.authToken, (req, res, next) => {
    (0, invitationController_1.deleteInvitation)(req, res, next);
});
exports.default = router;
