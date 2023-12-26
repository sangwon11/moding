import { Router } from 'express';
import orderController from '../../controllers/orderController';
import asyncHandler from '../../utils/asyncHandler';
import isAuthenticated from '../../middleware/isAuthenticated';
import {
  userOrderValidator,
  objectIdValidator,
  validateError,
} from '../../middleware/validator';

const orderRouter = Router();

// 주문하기
orderRouter.post(
  '/',
  isAuthenticated,
  userOrderValidator,
  validateError,
  asyncHandler(orderController.createOrder)
);

// 주문조회(userId)
orderRouter.get(
  '/:userId',
  isAuthenticated,
  asyncHandler(orderController.getOrders)
);

// 주문조회(userId)
orderRouter.get(
  '/:userId',
  isAuthenticated,
  asyncHandler(orderController.getOneOrder)
);

//주문수정
orderRouter.put(
  '/me/:id',
  objectIdValidator,
  userOrderValidator,
  validateError,
  asyncHandler(orderController.updateOrder)
);

export default orderRouter;
