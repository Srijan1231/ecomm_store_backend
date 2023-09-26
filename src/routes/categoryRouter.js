import express from "express";
import {
  getCategories,
  getCategoryById,
} from "../model/category/categoryModel.js";

const router = express.Router();
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const category = _id ? await getCategoryById(_id) : await getCategories();

    res.json({
      status: "success",
      message: "Here are the category/s",
      category,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
