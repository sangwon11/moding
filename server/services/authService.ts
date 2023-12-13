import models from "../models";

const { userModel } = models;
import bcrypt from "bcrypt";
import CustomError from "../utils/customError";
import jwt from "jsonwebtoken";

interface SignUpParams {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  postCode: number;
  address: string;
  addressDetail?: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const authService = {
  // 회원가입
  async signUp({
    email,
    password,
    username,
    phoneNumber,
    postCode,
    address,
    addressDetail,
  }: SignUpParams) {
    const user = await userModel.findOne({ email }).lean();
    if (user !== null) {
      const error = new CustomError("이미 가입된 email 입니다.", 409);
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
      phoneNumber: phoneNumber,
      postCode: postCode,
      address: address,
      addressDetail: addressDetail,
      role: "customer",
    });

    return newUser.toObject();
  },

  async SignIn({ email, password }: LoginParams) {
    // Find user by email
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid email or password", 401);
    }

    // Generate token
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const token = jwt.sign({ em: user.email }, JWT_SECRET, { expiresIn: "1h" });

    // Remove password from user info
    const { password: _, ...userInfo } = user;

    // Return user info and token
    return { user: userInfo, token };
  },
};

export default authService;
