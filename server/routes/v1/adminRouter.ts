import asyncHandler from "../../utils/asyncHandler";
import adminController from "../../controllers/adminController";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/seller/apply", asyncHandler(adminController.applySeller));

adminRouter.get("/members", asyncHandler(adminController.getAllUsers));

adminRouter.get("/member/:memberId", asyncHandler(adminController.getUserById));

export default adminRouter;
