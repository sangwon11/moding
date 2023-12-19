import { Request as ExpressRequest } from "express";
import { sellerModel } from "../models";
import CustomError from "../utils/customError";
import { fundingModel } from "../models";

interface fundingParams {
  title: string;
  category: string;
  goalAmount: number;
  startDate: string;
  endDate: string;
  preorder: boolean;
  preorderDate: string;
  preorderBenefits: string[];
  mainImageUrl: string;
  imageUrls: string[];
  deliveryPrice: number;
  deliveryDate: string;
  options: any[];
  deliveryType: string;
  deliveryNumber: string;
}

interface User {
  userId: string;
}

interface Request extends ExpressRequest {
  user?: User;
}
const getUserIdFromRequest = (req: Request): string | null => {
  console.log(req.user);
  return req.user ? req.user.userId : null;
};

const sellerService = {
  async createFunding(req: Request, params: fundingParams) {
    try {
      const {
        title,
        category,
        goalAmount,
        startDate,
        endDate,
        preorder,
        preorderBenefits,
        mainImageUrl,
        imageUrls,
        deliveryPrice,
        deliveryDate,
        options,
        deliveryNumber,
        deliveryType,
      } = params;

      const userId = getUserIdFromRequest(req);

      if (!userId) {
        throw new CustomError("사용자 인증이 필요합니다.", 401);
      }

      const existingSeller = await sellerModel.findOne({ userId });

      if (!existingSeller) {
        throw new CustomError("셀러 권한이 필요합니다.", 403);
      }

      if (
        !title ||
        !category ||
        startDate === undefined ||
        endDate === undefined ||
        !Array.isArray(preorderBenefits) ||
        preorderBenefits.length === 0 ||
        !mainImageUrl ||
        !imageUrls ||
        isNaN(deliveryPrice) ||
        isNaN(Date.parse(deliveryDate)) ||
        !Array.isArray(options)
      ) {
        throw new CustomError("모든 필수 필드를 입력해야 합니다.", 400);
      }

      if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        throw new CustomError("올바른 날짜 형식을 사용하세요.", 400);
      }

      if (goalAmount <= 0) {
        throw new CustomError("올바른 금액 형식을 사용하세요.", 400);
      }

      if (imageUrls.length < 2) {
        throw new CustomError(
          "최소 2개 이상의 이미지를 업로드해야 합니다.",
          400
        );
      }

      console.log("Funding created successfully");

      const funding = new fundingModel({
        title,
        category,
        goalAmount,
        startDate,
        endDate,
        preorder,
        preorderBenefits,
        mainImageUrl,
        imageUrls,
        deliveryPrice,
        deliveryDate,
        options,
        seller: existingSeller._id,
        deliveryNumber,
        deliveryType,
      });

      await funding.save();

      return { success: true, message: "펀딩이 성공적으로 등록되었습니다." };
    } catch (error) {
      console.error("error occurred while creating funding:", error);

      if (error instanceof CustomError) {
        console.error("CustomError: ", error.message, "Status: ", error.status);
        throw error;
      } else {
        console.error("Unknown error: ", error);
        throw new CustomError("서버 오류입니다.", 500);
      }
    }
  },

  async updateFunding(fundingId: string, params: fundingParams) {
    try {
      const existingFunding = await fundingModel.findById(fundingId);

      if (!existingFunding) {
        return { success: false, message: "펀딩을 찾을 수 없습니다." };
      }

      existingFunding.title = params.title;

      await existingFunding.save();

      return {
        success: true,
        message: "펀딩 정보가 성공적으로 수정되었습니다.",
        data: {
          funding: existingFunding,
        },
      };
    } catch (error) {
      throw new CustomError("펀딩 정보를 수정할 수 없습니다.", 403);
    }
  },
  async deliveryUpdate(
    fundingId: string,
    deliveryNumber: string,
    deliveryType: string
  ) {
    console.log("fundingId:", fundingId);
    console.log("deliveryNumber:", deliveryNumber);
    console.log("deliveryType:", deliveryType);
    try {
      const funding = await fundingModel.findById(fundingId);

      if (!funding) {
        return { success: false, message: "펀딩을 찾을 수 없습니다." };
      }

      funding.deliveryNumber = deliveryNumber;
      funding.deliveryType = deliveryType;

      await funding.save();

      return {
        success: true,
        message: "배송 정보가 성공적으로 업데이트되었습니다.",
      };
    } catch (error) {
      console.log(error);
      throw new CustomError("배송 정보를 업데이트할 수 없습니다.", 500);
    }
  },
};

export default sellerService;
