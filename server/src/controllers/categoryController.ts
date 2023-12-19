import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

interface CategoryParams {
  name: String;
}

const categoryController = {
  async getCategories(req: Request, res: Response) {
    const categories = await categoryService.getCategories();

    res.json({
      error: null,
      data: categories,
    });
  },

  async postCategories(req: Request, res: Response) {
    const category = await categoryService.postCategories(
      req.body as CategoryParams
    );

    res.json({
      error: null,
      data: category,
    });
  },
};

export default categoryController;
