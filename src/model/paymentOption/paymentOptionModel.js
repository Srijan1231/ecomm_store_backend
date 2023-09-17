import mongoose from "mongoose";
const paymentOption = mongoose.model("paymentoptions", {});

export const getPaymentOptions = () => {
  return paymentOption.find();
};
export const getOnePaymentOption = (_id) => {
  return paymentOption.findById(_id);
};

export const getSinglePaymentOption = (filter) => {
  return paymentOption.findOne(filter);
};
