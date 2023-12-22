import { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
    },
    orderNumber: {
      type: Number,
      required: true,
    },
    orderedBy: {
      type: String,
      required: true,
    },
    postCode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    addressDetail: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    fundingId: {
      type: Schema.Types.ObjectId,
      ref: 'funding',
      required: true,
    },
    orderList: {
      type: [
        {
          optionId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    donation: {
      type: Number,
      required: true,
    },
    nameOpen: {
      type: Boolean,
      required: true,
    },
    priceOpen: {
      type: Boolean,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['펀딩진행중', '배송준비중', '주문완료', '배송중', '배송완료'],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ['카드', '토스', '카카오', '네이버'],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'orders',
    versionKey: false,
  }
);

export default orderSchema;
