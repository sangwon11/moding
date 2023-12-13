import { Request, Response } from "express";
import authService from "../services/authService";
import CustomError from "../utils/customError";

interface SignUpParams {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  postCode: number;
  address: string;
  addressDetail?: string;
}

const authController = {
  // 회원가입
  async authSignUp(req: Request, res: Response) {
    try {
      const user = await authService.signUp(req.body as SignUpParams);

      res.status(201).json({
        error: null,
        data: user,
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
        // 다른 예외 처리
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
  async authSignIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required." });
      }

      const result = await authService.SignIn({ email, password });

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
};

export default authController;
