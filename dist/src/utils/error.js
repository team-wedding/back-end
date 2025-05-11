"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ClientError = void 0;
class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ClientError = ClientError;
;
class ValidationError extends Error {
    constructor(message, statusCode = 422) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ValidationError = ValidationError;
