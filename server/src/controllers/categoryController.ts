import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

interface CategoryParams {
  categoryId: object;
  categoryName: string;
}

const categoryController = {
  //카테고리 조회
  async getCategories(req: Request, res: Response) {
    const { categoryId } = req.params;
    const categories = await categoryService.getCategories();

    res.status(200).json({
      error: null,
      data: categories,
    });
  },

  async getCategoryById(req: Request, res: Response) {
    const { categoryId } = req.params;
    const getCategoryId = await categoryService.getCategoryById({ categoryId });

    res.status(200).json({
      error: null,
      data: getCategoryId,
    });
  },

  async postCategories(req: Request, res: Response) {
    const { categoryName } = req.params;
    const category = await categoryService.postCategories(req.body);

    res.status(201).json({
      error: null,
      data: category,
    });
  },
};

export default categoryController;
