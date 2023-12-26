import { Request, Response } from 'express';
import orderService from '../services/orderService';
import CustomError from '../utils/customError';

interface orderParams {
  userId: string;
  orderId: string;
  orderNumber: string;
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  fundingId: string;
  orderList: optionParams[];
  donation: number;
  nameOpen: boolean;
  priceOpen: boolean;
  orderStatus: string;
  paymentMethod: string;
}

interface newOrderParams {
  userId: string;
  orderId: string;
  orderNumber: string;
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  fundingId: string;
  orderList: optionParams[];
  donation: number;
  nameOpen: boolean;
  priceOpen: boolean;
  orderStatus: string;
  paymentMethod: string;
}

interface optionParams {
  optionsId: string;
  amount: number;
}

interface updateOrderParams {
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
}

const orderController = {
  // 주문하기
  async createOrder(req: Request, res: Response) {
    const newOrder = await orderService.createOrder(req.body as newOrderParams);

    res.status(201).json({
      error: null,
      data: newOrder,
    });
  },

  // 주문조회(userId)
  async getOrders(req: Request, res: Response) {
    const userId = req.params.userId;
    const orders = await orderService.getOrders(userId);

    res.status(200).json({
      error: null,
      data: orders,
    });
  },

  // 주문조회(orderId)
  async getOneOrder(req: Request, res: Response) {
    const orderId = req.params.orderId;
    const order = await orderService.getOneOrder(orderId);

    res.status(200).json({
      error: null,
      data: order,
    });
  },

  // 주문조회(orderNumber)
  async getOrderByOrderNum(req: Request, res: Response) {
    const { orderNumber } = req.params;
    const order = await orderService.getOrderByOrderNumber(orderNumber);

    res.status(200).json({
      error: null,
      data: order,
    });
  },

  // 주문수정
  async updateOrder(req: Request, res: Response) {
    const id = req.params.id;
    const updatedOrder = await orderService.updateOrder(
      id,
      req.body as updateOrderParams
    );

    res.status(201).json({
      error: null,
      data: updatedOrder,
    });
  },

  // 주문수정(주문취소후 배송상태 변경 때문)
  async updateOrderStatus(req: Request, res: Response) {
    const orderId = req.params.orderId;
    const { orderStatus } = req.body;
    const updatedOrderStatus = await orderService.updateOrderStatus(
      orderId,
      orderStatus
    );

    res.status(201).json({
      error: null,
      data: updatedOrderStatus,
    });
  },

  // 주문취소
  async deleteOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const deletedOrder = await orderService.deleteOrder(orderId);

    res.status(204).json({
      error: null,
      data: deletedOrder,
    });
  },
};

export default orderController;
