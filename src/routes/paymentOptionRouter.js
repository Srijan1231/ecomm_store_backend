import express from "express";
import {
  getOnePaymentOption,
  getPaymentOptions,
} from "../model/paymentOption/paymentOptionModel.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { _id } = req.params;
    const paymentOption = _id
      ? await getOnePaymentOption(_id)
      : await getPaymentOptions();

    res.json({
      status: "success",
      message: "Here are the paymentOption/s",
      paymentOption,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
