import { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'categories',
    versionKey: false,
  }
);
export default categorySchema;
