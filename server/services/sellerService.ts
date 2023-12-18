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
      !Array.isArray(options) // 옵션에 대한 유효성 검사 추가
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
      throw new CustomError("최소 2개 이상의 이미지를 업로드해야 합니다.", 400);
    }

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
    });

    await funding.save();

    return { success: true, message: "펀딩이 성공적으로 등록되었습니다." };
  },
  async updateFunding(fundingId: string, params: fundingParams) {
    try {
      const existingFunding = await fundingModel.findById(fundingId);

      console.log("params:", params);

      if (!existingFunding) {
        return { success: false, message: "펀딩을 찾을 수 없습니다." };
      }

      // 여기에서 params에 따라 existingFunding 업데이트를 수행하세요.

      // 예시: title 업데이트
      existingFunding.title = params.title;

      // 다른 필드들에 대한 업데이트도 수행하세요.

      await existingFunding.save();

      return {
        success: true,
        message: "펀딩 정보가 성공적으로 수정되었습니다.",
        data: {
          funding: existingFunding, // 업데이트된 펀딩 정보 반환
        },
      };
    } catch (error) {
      throw new CustomError("펀딩 정보를 수정할 수 없습니다.", 403);
    }
  },
};

export default sellerService;
