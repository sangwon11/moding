import { orderModel } from '../models';
import CustomError from '../utils/customError';
import {
  // orderParams,
  newOrderParams,
  optionParams,
} from '../interface/interfaces';

//회원주문조회
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

interface updateOrderParams {
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
}

const orderService = {
  // 주문하기
  async createOrder({
    userId,

    orderedBy,
    postCode,
    address,
    addressDetail,
    phoneNumber,
    fundingId,
    orderList,
    donation,
    nameOpen,
    priceOpen,
    orderStatus,
    paymentMethod,
  }: newOrderParams) {
    // 서버연결없이도 겹치지않는 난수만들기
    const orderNumber =
      Date.now().toString().slice(5) +
      String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    const newOrder = await orderModel.create({
      userId: userId,

      orderedBy: orderedBy,
      postCode: postCode,
      address: address,
      addressDetail: addressDetail,
      phoneNumber: phoneNumber,
      fundingId: fundingId,
      orderNumber: orderNumber,
      orderList: orderList,
      donation: donation,
      nameOpen: nameOpen,
      priceOpen: priceOpen,
      orderStatus: '주문완료',
      paymentMethod: paymentMethod,
    });

    return newOrder.toObject();
  },

  // 주문조회(userId)
  async getOrders(userId: string) {
    const orders = await orderModel.find({ userId: userId }).lean();
    return orders;
  },

  // 주문조회(orderId)
  async getOneOrder(orderId: string) {
    const order = await orderModel.find({ orderId: orderId }).lean();

    if (order === null) {
      const error = new CustomError('주문이 존재하지 않습니다.', 404);
      throw error;
    }

    return order;
  },

  // 주문조회(orderNumber)
  async getOrderByOrderNumber(orderNumber: string) {
    const order = await orderModel.findOne({ orderNumber }).lean();

    if (order === null) {
      const error = new CustomError('주문이 존재하지 않습니다.', 404);
      throw error;
    }

    return order;
  },

  // 주문수정
  async updateOrder(
    orderId: string,
    {
      orderedBy,
      postCode,
      address,
      addressDetail,
      phoneNumber,
    }: updateOrderParams
  ) {
    const order = await orderModel.findById({ orderId }).lean();

    if (order === null) {
      const error = new CustomError('주문이 존재하지 않습니다.', 404);
      throw error;
    }

    if (order.orderStatus !== '배송중') {
      const error = new CustomError('주문수정이 불가능합니다.', 400);
      throw error;
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {
        orderedBy: orderedBy,
        postCode: postCode,
        address: address,
        addressDetail: addressDetail,
        phoneNumber: phoneNumber,
      },
      { new: true }
    );

    return updatedOrder;
  },

  // 주문수정(주문취소후 배송상태 변경 때문)
  async updateOrderStatus(orderId: string, orderStatus: string) {
    const order = await orderModel.findById(orderId).lean();

    if (!order) {
      const error = new CustomError('주문이 존재하지 않습니다.', 401);
      throw error;
    }

    const updatedOrderStatus = await orderModel.updateOne(
      { orderId },
      {
        orderStatus,
      }
    );

    return updatedOrderStatus;
  },

  // 주문취소
  async deleteOrder(orderId: string) {
    const order = await orderModel.findById(orderId).lean();

    if (!order) {
      const error = new CustomError('주문이 존재하지 않습니다.', 401);
      throw error;
    }

    const deletedOrder = await orderModel.findOneAndDelete({ orderId });

    return deletedOrder;
  },
};

export default orderService;
