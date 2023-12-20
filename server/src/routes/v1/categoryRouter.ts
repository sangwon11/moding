import asyncHandler from '../../utils/asyncHandler';
import categoryController from '../../controllers/categoryController';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/', asyncHandler(categoryController.getCategories));
categoryRouter.post('/', asyncHandler(categoryController.postCategories));

export default categoryRouter;
