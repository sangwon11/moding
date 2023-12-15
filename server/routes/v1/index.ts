import authRouter from "./authRouter";
import { Router } from "express";
import fundingRouter from "./fundingRouter";

const v1Router = Router();

//User
v1Router.use("/auth", authRouter);

v1Router.use("/funding", fundingRouter);

export default v1Router;
