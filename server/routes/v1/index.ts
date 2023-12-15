import authRouter from "./authRouter";
import { Router } from "express";
import fundingRouter from "./fundingRouter";
import userRouter from "./userRouter";

const v1Router = Router();

//User
v1Router.use("/auth", authRouter);

v1Router.use("/fundings", fundingRouter);

v1Router.use("/user", userRouter);

export default v1Router;
