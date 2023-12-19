import { Request, Response } from "express";
import adminService from "../services/adminService";
import userService from "../services/userService";

const sellerController = {
  async applySeller(req: Request, res: Response) {
    try {
      const { userId, companyName, businessLicense, phoneNumber, email } =
        req.body;

      const result = await adminService.applySeller({
        userId,
        companyName,
        businessLicense,
        phoneNumber,
        email,
      });

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "서버 오류: 나중에 다시 시도하세요." });
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "서버 오류: 나중에 다시 시도하세요." });
    }
  },
};

export default sellerController;
