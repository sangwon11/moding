import asyncHandler from "../../utils/asyncHandler";
import adminController from "../../controllers/adminController";
import { Router } from "express";

const sellerRouter = Router();

sellerRouter.post("/seller/apply", asyncHandler(adminController.applySeller));

sellerRouter.get("/members", asyncHandler(adminController.getAllUsers));

export default sellerRouter;
