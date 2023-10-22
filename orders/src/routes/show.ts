import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { NotAuthorizedError, NotFoundError } from "@path_to_10e7/common";

const router = express.Router();

router.get("/api/orders/:orderId", async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId != req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  res.send(order);
});

export { router as showOrderRouter };
