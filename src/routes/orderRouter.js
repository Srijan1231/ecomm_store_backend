import express from "express";
import { insertOrder } from "../model/order/orderModel.js";
import { auth } from "../middleware/authMiddleware.js";
// import {
//   getOneProduct,
//   getProducts,
//   getProductsByCategory,
// } from "../model/product/productModel.js";
const router = express.Router();
// router.get("/", auth, (req, res, next) => {
//   try {
//     res.json({
//       status: "success",
//       message: "here is the user info",
//       user: req.userInfo,
//     });
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/", async (req, res, next) => {
  try {
    const result = await insertOrder(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message: "Order Placed ",
      });

      return;
    }

    res.json({
      status: "error",
      message: "Unable to place order, Please try again later",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
