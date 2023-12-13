import { Request, Response } from "express";
import fundingService from "../services/fundingService";
import CustomError from "../utils/customError";
import models from "../models";

const { fundingModel } = models;
const fundingController = {
  // 펀딩 랭킹
  async getFundingRankingByAchievement(req: Request, res: Response) {
    try {
      const fundingRanking =
        await fundingService.getFundingRankingByAchievement();

      res.status(200).json({
        error: null,
        data: fundingRanking,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({
          error: {
            message: error.message,
            status: error.status,
          },
          data: null,
        });
      } else {
        res.status(500).json({
          error: {
            message: "Internal Server Error",
            status: 500,
          },
          data: null,
        });
      }
    }
  },
  async getPopularity(req: Request, res: Response) {
    try {
      const fundingPopularity = await fundingService.getPopularity();

      res.status(200).json({
        error: null,
        data: fundingPopularity,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({
          error: {
            message: error.message,
            status: error.status,
          },
          data: null,
        });
      } else {
        res.status(500).json({
          error: {
            message: "Internal Server Error",
            status: 500,
          },
          data: null,
        });
      }
    }
  },
  async getUpcoming(req: Request, res: Response) {
    try {
      const fundingUpcoming = await fundingService.getUpcoming();

      res.status(200).json({
        error: null,
        data: fundingUpcoming,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({
          error: {
            message: error.message,
            status: error.status,
          },
          data: null,
        });
      } else {
        res.status(500).json({
          error: {
            message: "Internal Server Error",
            status: 500,
          },
          data: null,
        });
      }
    }
  },
  async getPreOrderFundings(req: Request, res: Response) {
    try {
      const prerorderFundings = await fundingService.getPreorderFundings();

      res.status(200).json({
        error: null,
        data: prerorderFundings,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({
          error: {
            message: error.message,
            status: error.status,
          },
          data: null,
        });
      } else {
        res.status(500).json({
          error: {
            message: "Internal Server Error",
            status: 500,
          },
          data: null,
        });
      }
    }
  },
};

export default fundingController;
