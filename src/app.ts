import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models";
import userRouter from "./routes/userRouter";
import invitationRouter from "./routes/invitationRouter";
import attendanceRouter from "./routes/attendanceRouter";
import celebrationMsgRouter from "./routes/celebrationMsgRouter";
import CelebrationMsg from "./models/celebrationMsg"; // db 자동 업데이트
import GuestInfo from "./models/guestInfo"; // db 자동 업데이트

// app 정의
const app: Application = express();

// 미들웨어 설정
app.use(express.json());
dotenv.config();
app.use(cors({ exposedHeaders: ["Authorization"] }));

CelebrationMsg.initialize(sequelize); // 모델 초기화  (한 줄 추가)
GuestInfo.initialize(sequelize); // 모델 초기화  (한 줄 추가)

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

// 서버 실행
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("서버가 실행중입니다.");
});
