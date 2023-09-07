import mongoose from "mongoose";
const category = mongoose.model("categories", {});

export const getCategories = () => {
  return category.find();
};
export const getCategoryById = (_id) => {
  return category.findById(_id);
};
// export const getProductsByCategory = (filter) => {
//   const _id = new mongoose.Types.ObjectId(filter);
//   return product.find({ parentCat: _id });
// };
// export const getSingleProduct = (filter) => {
//   return product.findOne(filter);
// };
