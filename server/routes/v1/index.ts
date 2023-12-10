import authRouter from "./authRouter";
import { Router } from "express";

const v1Router = Router();

//User
v1Router.use('/auth', authRouter);

export default v1Router;