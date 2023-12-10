import mongoose from "mongoose";
import userSchema from "./schemas/user";

const userModel = mongoose.model('user', userSchema);

export default userModel;