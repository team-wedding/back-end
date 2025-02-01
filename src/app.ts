import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models";
import userRouter from "./routes/userRouter";
import invitationRouter from "./routes/invitationRouter";
import attendanceRouter from "./routes/attendanceRouter";
import celebrationMsgRouter from "./routes/celebrationMsgRouter";
import imageUploadRouter from "./routes/imageUploadRouter";

// app 정의
const app: Application = express();

// 미들웨어 설정
app.use(express.json());
dotenv.config();
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true, exposedHeaders: ['Authorization'], }));

// sequelize db 연결
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("데이터베이스 연결 및 최신화 성공! ");
  })
  .catch((err: Error) => {
    console.error(err);
  });

// 라우터 설정
app.use("/api/users", userRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/attendances", attendanceRouter);
app.use("/api/celebrationMsgs", celebrationMsgRouter);
app.use("/api/imageUpload", imageUploadRouter);

// 서버 실행
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("서버가 실행중입니다.");
});
