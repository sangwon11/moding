import { RequestIncludeJWT } from "./../routes/v1/userRouter";
import { Request, Response } from "express";
import userService from "../services/userService";
import CustomError from "../utils/customError";

const userController = {
  async getUserProfile(req: RequestIncludeJWT, res: Response) {
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
  async deleteUser(req: RequestIncludeJWT, res: any) {
    try {
      const userIdToDelete = req.user.userId;

      const result = await userService.deleteUser(userIdToDelete);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "서버 오류입니다." });
      }
    }
  },
  async updateUserProfile(req: RequestIncludeJWT, res: Response) {
    try {
      const userIdToUpdate = req.user.userId;
      const updateData = req.body;

      const result = await userService.updateUserProfile(
        userIdToUpdate,
        updateData
      );

      if (result.success) {
        res.status(200).json(result);
      } else if (result.status === 400) {
        res.status(result.status).json({ error: result.message });
      } else if (result.status === 404) {
        res.status(result.status).json({ error: result.message });
      }
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
