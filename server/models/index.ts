import mongoose from "mongoose";
import userSchema from "./schemas/user";
import fundingSchema from "./schemas/funding";
import sellerSchema from "./schemas/seller";

const userModel = mongoose.model("user", userSchema);

const fundingModel = mongoose.model("funding", fundingSchema);

const sellerModel = mongoose.model("seller", sellerSchema);

export { userModel, fundingModel, sellerModel };
