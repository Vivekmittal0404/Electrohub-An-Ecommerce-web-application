import express from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);

export default router;
