"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageUploadController_1 = require("../controllers/imageUploadController");
const imageUploader_1 = __importDefault(require("../utils/imageUploader"));
const router = express_1.default.Router();
router.post('/', imageUploader_1.default.array("images"), imageUploadController_1.postImage);
exports.default = router;
