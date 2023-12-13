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
    preorderBenefit: [
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
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
    collection: "funding",
    versionKey: false,
  }
);

export default fundingSchema;
