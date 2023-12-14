import { Request, Response } from 'express';
import authService from '../services/authService';
import CustomError from '../utils/customError';

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
      const user = await authService.signUp(req.body as SignUpParams);

      res.status(201).json({
        error: null,
        data: user,
      });
  },
};

export default authController;