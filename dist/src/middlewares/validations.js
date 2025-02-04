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
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetValidate = exports.changeUserInfoValidate = exports.changePasswordValidate = exports.paramValidate = exports.loginValidate = exports.signupValidate = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const err = (0, express_validator_1.validationResult)(req);
    if (err.isEmpty()) {
        return next();
    }
    else {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(err.array());
        return;
    }
});
exports.validate = validate;
exports.signupValidate = [
    (0, express_validator_1.body)('name').isString(),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isString().isLength({ min: 4 }),
    (0, express_validator_1.body)('provider').isString(),
    exports.validate
];
exports.loginValidate = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isString(),
    exports.validate
];
exports.paramValidate = [
    (0, express_validator_1.param)('id').optional().isInt().toInt(),
    exports.validate
];
exports.changePasswordValidate = [
    (0, express_validator_1.body)('password').isString(),
    (0, express_validator_1.body)('newPassword').isString(),
    exports.validate
];
exports.changeUserInfoValidate = [
    (0, express_validator_1.body)('newEmail').optional().isEmail(),
    (0, express_validator_1.body)('newName').optional().isString(),
    exports.validate
];
exports.passwordResetValidate = [
    (0, express_validator_1.body)('email').isEmail(),
    exports.validate
];
