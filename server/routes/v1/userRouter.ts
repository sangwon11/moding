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

userRouter.delete(
  "/withdraw",
  isAuthenticated,
  asyncHandler(userController.deleteUser)
);

export default userRouter;
