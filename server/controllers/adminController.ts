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

  async getUserById(req: Request, res: Response) {
    try {
      const { memberId } = req.params;

      const user = await userService.getUserById(memberId);

      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res
          .status(404)
          .json({ success: false, message: "사용자를 찾을 수 없습니다." });
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, error: "서버 오류: 나중에 다시 시도하세요." });
    }
  },

  async updateUsername(req: Request, res: Response) {
    try {
      const { memberId } = req.params;
      const { newUsername } = req.body;

      const updatedUser = await userService.updateUsername(
        memberId,
        newUsername
      );

      if (updatedUser.success) {
        res.status(200).json(updatedUser);
      } else {
        res.status(400).json(updatedUser);
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, error: "서버 오류: 나중에 다시 시도하세요." });
    }
  },

  async deleteMember(req: Request, res: Response) {
    try {
      const { memberId } = req.params;

      const deletionResult = await userService.deleteMember(memberId);

      if (deletionResult.success) {
        res.status(200).json(deletionResult);
      } else {
        res.status(400).json(deletionResult);
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, error: "서버 오류: 나중에 다시 시도하세요." });
    }
  },
};

export default sellerController;
