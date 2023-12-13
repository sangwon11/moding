import asyncHandler from "../../utils/asyncHandler";
import fundingController from "../../controllers/fundingController";
import { Router } from "express";

const fundingRouter = Router();

fundingRouter.get("/", asyncHandler(fundingController.getAllFunding));

export default fundingRouter;
