import asyncHandler from "../../utils/asyncHandler";
import fundingController from "../../controllers/fundingController";
import { Router } from "express";

const fundingRouter = Router();

// 펀딩 랭킹(달성률) 가져오기
fundingRouter.get(
  "/ranking",
  asyncHandler(fundingController.getFundingRankingByAchievement)
);

fundingRouter.get("/popularity", asyncHandler(fundingController.getPopularity));

fundingRouter.get("/upcoming", asyncHandler(fundingController.getUpcoming));

fundingRouter.get(
  "/preorder",
  asyncHandler(fundingController.getPreOrderFundings)
);

export default fundingRouter;
