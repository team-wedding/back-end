"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./models");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const invitationRouter_1 = __importDefault(require("./routes/invitationRouter"));
const attendanceRouter_1 = __importDefault(require("./routes/attendanceRouter"));
const celebrationMsgRouter_1 = __importDefault(require("./routes/celebrationMsgRouter"));
const imageUploadRouter_1 = __importDefault(require("./routes/imageUploadRouter"));
// app 정의
const app = (0, express_1.default)();
// 미들웨어 설정
app.use(express_1.default.json());
dotenv_1.default.config();
app.use((0, cors_1.default)({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://wedding-front-xi.vercel.app/', 'https://woogyeol.vercel.app'], credentials: true, exposedHeaders: ['Authorization'], }));
// sequelize db 연결
models_1.sequelize
    .sync({ alter: true })
    .then(() => {
    console.log("데이터베이스 연결 및 최신화 성공! ");
})
    .catch((err) => {
    console.error(err);
});
// 라우터 설정
app.use("/api/users", userRouter_1.default);
app.use("/api/invitations", invitationRouter_1.default);
app.use("/api/attendances", attendanceRouter_1.default);
app.use("/api/celebrationMsgs", celebrationMsgRouter_1.default);
app.use("/api/imageUpload", imageUploadRouter_1.default);
// 서버 실행
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("서버가 실행중입니다.");
}).keepAliveTimeout = 190000;
