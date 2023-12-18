import { Request, Response } from "express";
import sellerService from "../services/sellerService";
import CustomError from "../utils/customError";

const sellerController = {
  async createFunding(req: Request, res: Response) {
    try {
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
      const params = {
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
};

export default sellerController;
