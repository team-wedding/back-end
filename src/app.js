const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const cors = require("cors");

app.use(express.json());
dotenv.config();
app.use(cors({ exposedHeaders: ["Authorization"] }));

app.listen(process.env.PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

const userRouter = require("./routes/userRouter");
const invitationRouter = require("./routes/invitationRouter");
const attendanceRouter = require("./routes/attendanceRouter");

app.use("/api/users", userRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/attendances", attendanceRouter);
