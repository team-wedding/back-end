import express, { Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import {sequelize} from "./models";
import userRouter from "./routes/userRouter";
import invitationRouter from "./routes/invitationRouter";
import attendanceRouter from "./routes/attendanceRouter";

// app 정의
const app : Application = express(); 

// 미들웨어 설정
app.use(express.json());
dotenv.config();
app.use(cors({ exposedHeaders: ["Authorization"] }));

// sequelize db 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err: Error) => {
    console.error(err);
  });

// 라우터 설정
app.use("/api/users", userRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/attendances", attendanceRouter);

// 서버 실행 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("서버가 실행중입니다.");
});