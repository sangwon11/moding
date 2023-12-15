import asyncHandler from "../../utils/asyncHandler";
import authController from "../../controllers/authController";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", asyncHandler(authController.authSignUp));

authRouter.post("/sign-in", asyncHandler(authController.authSignIn));

export default authRouter;
