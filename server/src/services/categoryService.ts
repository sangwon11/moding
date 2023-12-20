import { categoryModel } from '../models';
import CustomError from '../utils/customError';

interface categoryParams {
  name: String;
}

const categoryService = {
  async getCategories() {
    const categories = await categoryModel.find({}).lean();
    return categories;
  },

  async postCategories({ name }: categoryParams) {
    const categoryName = await categoryModel.findOne({ name }).lean();
    if (categoryName !== null) {
      const error = new CustomError('이미 존재하는 category 입니다.', 409);
      throw error;
    }

    const newCategory = await categoryModel.create({
      name: name,
    });
    return newCategory.toObject();
  },
};

export default categoryService;
