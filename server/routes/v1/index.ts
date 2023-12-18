import authRouter from "./authRouter";
import { Router } from "express";
import fundingRouter from "./fundingRouter";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";
import sellerRouter from "./sellerRouter";

const v1Router = Router();

//User
v1Router.use("/auth", authRouter);

v1Router.use("/fundings", fundingRouter);

v1Router.use("/user", userRouter);

v1Router.use("/admin", adminRouter);

v1Router.use("/seller", sellerRouter);

export default v1Router;
