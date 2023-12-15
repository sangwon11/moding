import { userModel } from "../models"; // 사용자 모델 임포트

const userService = {
  async getUserProfile(userId: any) {
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
