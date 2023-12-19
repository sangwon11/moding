import { userModel } from "../models";

interface UpdateUserData {
  password?: string;
  phoneNumber?: string;
  postCode?: number;
  address?: string;
  addressDetail?: string;
}

const userService = {
  async getUserProfile(userId: string) {
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
  async deleteUser(userId: string) {
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      user.deletedAt = new Date();

      await user.save();
      return { message: "다음에 또 만나요!" };
    } catch (error) {
      throw error;
    }
  },
  async updateUserProfile(userId: string, updateData: UpdateUserData) {
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        throw { status: 404, message: "사용자를 찾을 수 없습니다." };
      }

      if (updateData.password) {
        if (updateData.password === user.password) {
          throw { status: 400, message: "동일한 비밀번호 입니다." };
        }
        user.password = updateData.password;
      }

      if (updateData.phoneNumber) {
        user.phoneNumber = updateData.phoneNumber;
      }

      if (updateData.postCode) {
        user.postCode = updateData.postCode;
      }

      if (updateData.address) {
        user.address = updateData.address;
      }

      if (updateData.addressDetail) {
        user.addressDetail = updateData.addressDetail;
      }

      await user.save();

      return {
        success: true,
        message: "사용자 정보가 업데이트되었습니다.",
        status: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: "서버 오류입니다.",
        status: 500,
      };
    }
  },
  async getAllUsers() {
    try {
      const users = await userModel.find({ deletedAt: null });

      return users;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
