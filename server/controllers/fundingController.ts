import { Request, Response } from "express";
import fundingService from "../services/fundingService";
import CustomError from "../utils/customError";
import { FundingFilter } from "../services/fundingService";

const fundingController = {
  async getAllFunding(req: Request, res: Response) {
    const { categoryId, startDate, endDate } = req.query;

    try {
      const filter: FundingFilter = {
        categoryId: categoryId as string,
        startDate: startDate as string,
        endDate: endDate as string,
      };

      const allFundings = await fundingService.getAllFundings(filter);

      res.status(200).json({
        success: true,
        data: allFundings,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  },
  async getFundingById(req: Request, res: Response) {
    try {
      const funding = await fundingService.getFundingById(req.params.id);
      res.status(200).json(funding);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "서버 오류입니다." });
      }
    }
  },
};

export default fundingController;
