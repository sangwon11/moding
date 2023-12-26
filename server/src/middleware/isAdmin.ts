import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
require("dotenv").config({ path: "../../.env" });

interface UserWithRole extends JwtPayload {
  role: string;
}

function isAdmin(req: any, res: any, next: NextFunction) {
  const secret = process.env.JWT_SECRET as Secret;
  if (req.headers["authorization"] === undefined) {
    const error = new CustomError("관리자 권한이 필요합니다.", 401);
    throw error;
  }

  const token = req.headers["authorization"].slice(7);

  try {
    const userInfo = jwt.verify(token, secret) as UserWithRole;
    req.user = userInfo;

    if (userInfo.ro === "admin") {
      next();
    } else {
      const error = new CustomError("관리자 권한이 필요합니다.", 403);
      throw error;
    }
  } catch (err) {
    const error = new CustomError("관리자 권한이 필요합니다", 401);
    throw error;
  }
}

export default isAdmin;
