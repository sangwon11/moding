import { fundingModel } from "../models";
import CustomError from "../utils/customError";

// 필터링 조건을 정의하는 타입 또는 인터페이스를 생성합니다.
export interface FundingFilter {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

const fundingService = {
  async getAllFundings({ categoryId, startDate, endDate }: FundingFilter) {
    try {
      const query: any = {};

      if (categoryId) {
        query.categoryId = categoryId;
      }

      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const fundings = await fundingModel.find(query).lean();
      return fundings;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Error fetching filtered fundings: ${errorMessage}`);
      throw new CustomError(
        `Error fetching filtered fundings: ${errorMessage}`,
        500
      );
    }
  },
  async getFundingById(id: any) {
    try {
      if (!id) {
        throw new CustomError("잘못된 id 입니다.", 400);
      }

      const funding = await fundingModel.findById(id).lean();

      if (!funding) {
        throw new CustomError("해당 funding이 존재하지 않습니다.", 404);
      }

      return funding;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Error fetching funding by ID: ${errorMessage}`);
      throw new CustomError(
        `Error fetching funding by ID: ${errorMessage}`,
        500
      );
    }
  },
};

export default fundingService;
