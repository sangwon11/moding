import { Request, Response } from "express";
import sellerService from "../services/sellerService";
import CustomError from "../utils/customError";

const createParams = (
  req: Request,
  additionalParams: Record<string, any> = {}
) => {
  const {
    title,
    category,
    goalAmount,
    startDate,
    endDate,
    preorder,
    preorderDate,
    preorderBenefits,
    mainImageUrl,
    imageUrls,
    deliveryPrice,
    deliveryDate,
    options,
    seller,
  } = req.body;

  return {
    title,
    category,
    goalAmount,
    startDate,
    endDate,
    preorder,
    preorderDate,
    preorderBenefits,
    mainImageUrl,
    imageUrls,
    deliveryPrice,
    deliveryDate,
    options,
    seller,
  };
};

const sellerController = {
  async createFunding(req: Request, res: Response) {
    try {
      const params = createParams(req);
      const result = await sellerService.createFunding(req, params);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  async updateFunding(req: Request, res: Response) {
    try {
      const fundingId = req.params.fundingId;
      console.log("fundingId:", req.params.fundingId);
      const params = createParams(req);
      console.log("params:", params);
      const result = await sellerService.updateFunding(fundingId, params);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(403).json(result);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  async deliveryUpdate(req: Request, res: Response) {
    try {
      const fundingId = req.params.fundingId;
      const { deliveryNumber, deliveryType } = req.body;

      const result = await sellerService.deliveryUpdate(
        fundingId,
        deliveryNumber,
        deliveryType
      );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result); // 펀딩을 찾을 수 없는 경우 404 상태 코드 반환
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },
};

export default sellerController;
