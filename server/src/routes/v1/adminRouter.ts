import asyncHandler from "../../utils/asyncHandler";
import adminController from "../../controllers/adminController";
import { Router } from "express";
import isAdmin from "../../middleware/isAdmin";

const adminRouter = Router();

adminRouter.post(
  "/seller/apply",
  isAdmin,
  asyncHandler(adminController.applySeller)
);

adminRouter.get("/members", isAdmin, asyncHandler(adminController.getAllUsers));

adminRouter.get(
  "/member/:memberId",
  isAdmin,
  asyncHandler(adminController.getUserById)
);

adminRouter.put(
  "/member/:memberId",
  isAdmin,
  asyncHandler(adminController.updateUsername)
);

adminRouter.post(
  "/member/delete/:memberId",
  isAdmin,
  asyncHandler(adminController.deleteMember)
);

adminRouter.get("/sellers", isAdmin, asyncHandler(adminController.getSellers));

export default adminRouter;
