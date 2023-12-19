import { sellerModel } from "../models";
import CustomError from "../utils/customError";
import { userModel } from "../models";

interface SellerParams {
  userId: string;
  companyName: string;
  businessLicense: string;
  phoneNumber: string;
  email: string;
}

const adminService = {
  async applySeller({
    userId,
    companyName,
    businessLicense,
    phoneNumber,
    email,
  }: SellerParams) {
    try {
      if (
        !userId ||
        !companyName ||
        !businessLicense ||
        !phoneNumber ||
        !email
      ) {
        throw new CustomError("모든 필수 필드를 입력해야 합니다.", 400);
      }

      const existingSeller = await sellerModel.findOne({ userId });
      if (existingSeller) {
        throw new CustomError("이미 셀러로 등록되어 있습니다.", 400);
      }

      const seller = new sellerModel({
        userId,
        companyName,
        businessLicense,
        phoneNumber,
        email,
      });

      await seller.save();

      const updatedUser = await userModel.findOneAndUpdate(
        { email },
        { role: "seller" }
      );

      return { success: true, message: "셀러 신청이 완료되었습니다." };
    } catch (error) {
      console.error(error);
      throw new CustomError("서버 오류: 나중에 다시 시도하세요.", 500);
    }
  },
};

export default adminService;
