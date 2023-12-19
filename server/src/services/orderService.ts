import { orderModel } from '../models';
import CustomError from '../utils/customError';

// interface orderData {
//   orderedBy: string;
//   postCode: string;
//   address: string;
//   addressDetail: string;
//   phoneNumber: string;
//   products: (string | number)[];
//   orderedEmail?: string;
// }

//회원주문조회
interface orderParams {
  userId: string;
  fundingId: string;
  orderId: number;
  orderNumber: string;
  orderedBy: string;
  postCode: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  orderList: optionParams[];
  donation: number;
  status: string;
  nameOpen: boolean;
  priceOpen: boolean;
  orderStatus: string;
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

const orderService = {
  // 주문하기
  async createOrder(orderParams: orderParams) {
    const {
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
    } = orderParams;

    // 서버연결없이도 겹치지않는 난수만들기
    const orderNumber =
      Date.now().toString().slice(5) +
      String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    const order = await orderModel.create({
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
    });

    return order.toObject();
  },

  // 전체 주문조회
  async getOrders(userId: string) {
    // 변수명은 항상 명확하게
    const orders = await orderModel.find({ userId: userId }).lean();
    return orders;
  },

  // 주문조회(id)
  async getOneOrder(userId: string) {
    const order = await orderModel.findById({ userId: userId }).lean();

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

    if (order.orderStatus !== '배송중') {
      const error = new CustomError('주문수정이 불가능합니다.', 400);
      throw error;
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      {
        orderedBy,
        postCode,
        address,
        addressDetail,
        phoneNumber,
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
      { _id: id },
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

    const deletedOrder = await orderModel.findOneAndDelete({ _id: id });

    return deletedOrder;
  },
};

export default orderService;
