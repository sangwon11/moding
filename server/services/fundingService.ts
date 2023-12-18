import { fundingModel } from "../models";
import CustomError from "../utils/customError";

const fundingService = {
  async getFundings() {
    const fundings = await fundingModel.find().lean();
    return fundings;
  },

  async getFundingById(id: string) {
    const funding = await fundingModel.findById(id).lean();

    if (funding === null) {
      throw new CustomError("해당 funding이 존재하지 않습니다.", 404);
    }

    return funding;
  },

  async getFundingByCategoryId(categoryId: string) {
    const fundings = await fundingModel.find({ categoryId }).lean();
    if (fundings.length === 0) {
      throw new CustomError(
        "해당 카테고리의 funding이 존재하지 않습니다.",
        404
      );
    }

    return fundings;
  },
};

export default fundingService;
