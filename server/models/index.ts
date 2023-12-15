import mongoose from "mongoose";
import userSchema from "./schemas/user";
import fundingSchema from "./schemas/funding";

const userModel = mongoose.model("user", userSchema);

const fundingModel = mongoose.model("funding", fundingSchema);

export { userModel, fundingModel };
