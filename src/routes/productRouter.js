import express from "express";
import {
  getOneProduct,
  getProducts,
  getProductsByCategory,
} from "../model/product/productModel.js";
const router = express.Router();
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const products = _id ? await getOneProduct(_id) : await getProducts();

    res.json({
      status: "success",
      message: "Here are the product/s",
      products,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/category/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = await getProductsByCategory(_id);

    res.json({
      status: "success",
      message: "Here are the product/s by category",
      products,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
