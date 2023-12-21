import { categoryModel } from '../models';
import CustomError from '../utils/customError';
// interface categoryParams {
//   categoryId: object;
//   categoryName: string;
// }

const categoryService = {
  async getCategories() {
    const categories = await categoryModel.find({}).lean();
    return categories;
  },

  async getCategoryById(id: string) {
    const category = await categoryModel.findById(id).lean();
    if (category === null) {
      throw new CustomError('해당 category는 존재하지 않습니다', 404);
    }
    return category;
  },

  async postCategories(categoryName: string) {
    const makeCategoryName = await categoryModel
      .findOne({ categoryName })
      .lean();
    if (makeCategoryName !== null) {
      const error = new CustomError('이미 존재하는 category 입니다.', 409);
      throw error;
    }

    const newCategory = await categoryModel.create({
      categoryName: categoryName,
    });
    return newCategory.toObject();
  },
};

export default categoryService;
