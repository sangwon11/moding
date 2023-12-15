import { fundingModel } from "../models";
import CustomError from "../utils/customError";

// 1. 펀딩을 전부다 불러오는거 2. 카테고리를 찾아서 해당 카테고리에 속한 모든 펀딩을 가져오는것. 3. 특정펀딩 Id 로만 가지고 오는것.

const fundingService = {
  async getFundings() {
    const fundings = await fundingModel.find().lean();
    return fundings;
  },

  async getFundingById(id: string) {
    const funding = await fundingModel.findById(id).lean(); // id => 이거를 찾을 수가 없어. funding => null

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
