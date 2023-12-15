import { Request, Response } from "express";
import userService from "../services/userService";
import CustomError from "../utils/customError";

const userController = {
  async getUserProfile(req: any, res: any) {
    try {
      const user = await userService.getUserProfile(req.user.userId);

      if (!user) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "서버 오류입니다." });
      }
    }
  },
};

export default userController;
