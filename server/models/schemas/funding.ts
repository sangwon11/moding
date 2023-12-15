import { Schema } from "mongoose";

const fundingSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    mainImageUrl: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    preorder: {
      type: Boolean,
      default: true,
    },
    preorderDate: {
      type: Boolean,
      default: true,
    },
    preorderBenefits: [
      {
        discount: {
          type: Number,
          default: 0,
        },
        freeDelivery: {
          type: Boolean,
          default: false,
        },
        event: {
          type: String,
          default: "",
        },
      },
    ],
    options: [
      {
        title: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
        currentAmount: {
          type: Number,
          default: 0,
        },
        info: {
          type: String,
          required: true,
        },
        deliveryPrice: {
          type: Number,
          default: 0,
        },
        deliveryDate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "funding",
    versionKey: false,
  }
);

export default fundingSchema;
