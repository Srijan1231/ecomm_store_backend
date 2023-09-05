import mongoose from "mongoose";
const product = mongoose.model("products", {});

export const getProducts = () => {
  return product.find();
};
export const getOneProduct = (_id) => {
  return product.findById(_id);
};
export const getProductsByCategory = (filter) => {
  const _id = new mongoose.Types.ObjectId(filter);
  return product.find({ parentCat: _id });
};
export const getSingleProduct = (filter) => {
  return product.findOne(filter);
};
