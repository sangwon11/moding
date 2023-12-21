import { Request, Response } from 'express';
import categoryService from '../services/categoryService';
import { ObjectId } from 'mongoose';

interface CategoryParams {
  categoryId: ObjectId;
  categoryName: string;
}

const categoryController = {
  //카테고리 전체 조회
  async getCategories(req: Request, res: Response) {
    // const { categoryId } = req.params;
    const categories = await categoryService.getCategories();

    res.status(200).json({
      error: null,
      data: categories,
    });
  },

  //카테고리 id로 조회
  async getCategoryById(req: Request, res: Response) {
    const { categoryId } = req.params;
    const getCategoryId = await categoryService.getCategoryById({ categoryId });

    res.status(200).json({
      error: null,
      data: getCategoryId,
    });
  },

  // 카테고리 추가
  async postCategories(req: Request, res: Response) {
    // const { categoryName } = req.params;
    const category = await categoryService.postCategories(req.body);

    res.status(201).json({
      error: null,
      data: category,
    });
  },
};

export default categoryController;
