import models from "../models";
import CustomError from "../utils/customError";

const { fundingModel } = models;

const fundingService = {
  // 펀딩 랭킹
  async getFundingRankingByAchievement() {
    try {
      const fundings = await fundingModel.find().lean().exec();

      const fundingsWithAchievement = fundings.map((funding) => {
        const achievement = (funding.currentAmount / funding.goalAmount) * 100;
        return { ...funding, achievement };
      });

      const sortedFundings = fundingsWithAchievement.sort(
        (a, b) => b.achievement - a.achievement
      );

      return sortedFundings;
    } catch (error) {
      // 'error'가 'Error' 인스턴스인지 확인합니다.
      if (error instanceof Error) {
        console.error(`Error fetching funding ranking: ${error.message}`);
        throw new CustomError(
          `Error fetching funding ranking: ${error.message}`,
          500
        );
      } else {
        // 'error'가 'Error' 타입이 아니라면, 일반적인 오류 메시지를 생성합니다.
        console.error("An unknown error occurred.");
        throw new CustomError("An unknown error occurred.", 500);
      }
    }
  },
  async getPopularity() {
    try {
      const fundings = await fundingModel.find().lean().exec();

      const popularityData = fundings.map((funding) => {
        const popularity = funding.currentAmount;
        return { ...funding, popularity };
      });

      popularityData.sort((a, b) => b.popularity - a.popularity);

      return popularityData;
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error calculating popularity by currentAmount: ${error.message}`
        );
        throw new CustomError(
          `Error calculating popularity by currentAmount: ${error.message}`,
          500
        );
      } else {
        console.error("An unknown error occurred.");
        throw new CustomError("An unknown error occurred.", 500);
      }
    }
  },
  async getUpcoming() {
    try {
      const currentDate = new Date();

      const fundings = await fundingModel.find({
        startDate: { $gt: currentDate },
      });

      return fundings;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error getting upcoming popularity: ${error.message}`);
        throw new CustomError(
          `Error getting upcoming popularity: ${error.message}`,
          500
        );
      }
    }
  },
  async getPreorderFundings() {
    try {
      const prerorderFundings = await fundingModel.find({
        preorder: true,
      });

      return prerorderFundings;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error getting preorder fundings: ${error.message}`);
        throw new CustomError(
          `Error getting preorder fundings: ${error.message}`,
          500
        );
      } else {
        console.error("An unknown error occurred.");
        throw new CustomError("An unknown error occurred.", 500);
      }
    }
  },
};

export default fundingService;
