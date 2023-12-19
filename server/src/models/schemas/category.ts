import { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
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
