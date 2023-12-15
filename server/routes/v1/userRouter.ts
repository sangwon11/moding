import userController from "../../controllers/userController";
import isAuthenticated from "../../middleware/isAuthenticated";
import asyncHandler from "../../utils/asyncHandler";
import { Router } from "express";

const userRouter = Router();

userRouter.get(
  "/me",
  isAuthenticated,
  asyncHandler(userController.getUserProfile)
);

export default userRouter;
