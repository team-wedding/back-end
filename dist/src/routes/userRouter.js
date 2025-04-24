"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validations_1 = require("../middlewares/validations");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.post('/signup', validations_1.signupValidate, userController_1.signup);
router.post('/login', validations_1.loginValidate, userController_1.login);
router.delete('/logout', authToken_1.authToken, userController_1.logout);
router.get('/refresh', authToken_1.refreshToken, userController_1.updateAccessToken);
router
    .route('/account')
    .get(authToken_1.authToken, userController_1.myPage)
    .put(authToken_1.authToken, validations_1.changeUserInfoValidate, userController_1.changeUserInfo)
    .delete(authToken_1.authToken, userController_1.deleteUser);
router.put('/account/password', authToken_1.authToken, validations_1.changePasswordValidate, userController_1.changePassword);
router.put('/account/password/reset', validations_1.passwordResetValidate, userController_1.resetPassword);
router.post('/oauth/kakao', authToken_1.kakaoAuthToken, userController_1.kakaoLogin);
router.post('/oauth/naver', authToken_1.naverAuthToken, userController_1.naverLogin);
exports.default = router;
