import userModel from "../models";
import bcrypt from 'bcrypt';
import CustomError from "../utils/customError"

interface SignUpParams {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  postCode: number;
  address: string;
  addressDetail?: string;
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
  }:SignUpParams) {
    
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
};

export default authService;
