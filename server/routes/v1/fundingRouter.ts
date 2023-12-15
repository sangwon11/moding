import fundingController from "../../controllers/fundingController";
import asyncHandler from "../../utils/asyncHandler";
import { Router } from "express";

const fundingRouter = Router();

fundingRouter.get("/", asyncHandler(fundingController.getAllFunding));

fundingRouter.get("/:id", asyncHandler(fundingController.getFundingById));

export default fundingRouter;
