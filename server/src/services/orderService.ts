import { orderModel } from '../models';
import CustomError from '../utils/customError';
import {
  orderParams,
  newOrderParams,
  optionParams,
  updateOrderParams,
} from '../interface/interfaces';

import { Schema, Types } from 'mongoose';

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

    // orderId 생성
    const orderId = new Types.ObjectId();

    const newOrder = await orderModel.create({
      userId: userId,
      orderId: orderId,
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
    id: string,
    {
      orderedBy,
      postCode,
      address,
      addressDetail,
      phoneNumber,
    }: updateOrderParams
  ) {
    const order = await orderModel.findById(id).lean();

    if (order === null) {
      const error = new CustomError('주문이 존재하지 않습니다.', 404);
      throw error;
    }

    if (
      !(order.orderStatus === '펀딩진행중' || order.orderStatus === '주문완료')
    ) {
      const error = new CustomError('주문수정이 불가능합니다.', 400);
      throw error;
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
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
  async updateOrderStatus(id: string, orderStatus: string) {
    const order = await orderModel.findById(id).lean();

    if (!order) {
      const error = new CustomError('주문이 존재하지 않습니다.', 401);
      throw error;
    }

    const updatedOrderStatus = await orderModel.updateOne(
      { id },
      {
        orderStatus,
      }
    );

    return updatedOrderStatus;
  },

  // 주문취소
  async deleteOrder(id: string) {
    const order = await orderModel.findById(id).lean();

    if (!order) {
      const error = new CustomError('주문이 존재하지 않습니다.', 401);
      throw error;
    }

    const deletedOrder = await orderModel.findByIdAndDelete(id);

    return deletedOrder;
  },
};

export default orderService;
