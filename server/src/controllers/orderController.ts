import { Request, Response } from 'express';
import orderService from '../services/orderService';

interface orderParams {
  userId: object;
  fundingId: object;
  orderList: [];
  donation: number;
  status: string;
  orderedBy: string;
  postCode: number;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  nameOpen: string;
  priceOpen: string;
  orderStatus: string;
}

interface orderListParams {
  optionsId: object;
  amount: number;
}

interface makePaymentParams {
  userId: object;
  selectedProduct: object;
  productId: string;
  quantity: number;
  donation: number;
  paymentMethod: string;
}

const orderController = {
  // 주문목록 조회
  async getOrders(req: Request, res: Response) {
    // const userId = res.locals.user.userId;
    const orders = await orderService.getOrders(req.params.userId);

    res.json({
      error: null,
      data: orders,
    });
  },

  // 주문조회(id)
  async getOneOrder(req: Request, res: Response) {
    // const { userId } = req.params;
    const order = await orderService.getOneOrder(req.params.userId);

    res.json({
      error: null,
      data: order,
    });
  },

  // 주문조회(orderNumber)
  async getOrderByOrderNum(req: Request, res: Response) {
    const { orderNumber } = req.params;
    const order = await orderService.getOrderByOrderNumber(orderNumber);

    res.json({
      error: null,
      data: order,
    });
  },

  // 주문수정
  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const orderData = req.body;
    const updatedOrder = await orderService.updateOrder(id, orderData);

    res.status(201).json({
      error: null,
      data: updatedOrder,
    });
  },

  // 주문수정(주문취소후 배송상태 변경 때문)
  async updateOrderStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const updatedOrderStatus = await orderService.updateOrderStatus(
      id,
      orderStatus
    );

    res.status(201).json({
      error: null,
      data: updatedOrderStatus,
    });
  },

  // 주문취소
  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    const deletedOrder = await orderService.deleteOrder(id);

    res.status(204).json({
      error: null,
      data: deletedOrder,
    });
    // 주문이 취소되었습니다. ?
  },

  //결제
  async makePayment(req: Request, res: Response) {
    // const;
  },
};

export default orderController;
