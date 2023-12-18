import authRouter from "./authRouter";
import { Router } from "express";
import fundingRouter from "./fundingRouter";
import userRouter from "./userRouter";
import uploadRouter from "./uploadRouter";
import adminRouter from "./adminRouter";

const v1Router = Router();

//User
v1Router.use("/auth", authRouter);

v1Router.use("/fundings", fundingRouter);

v1Router.use("/user", userRouter);

v1Router.use("/upload", uploadRouter);

v1Router.use("/admin", adminRouter);

export default v1Router;
