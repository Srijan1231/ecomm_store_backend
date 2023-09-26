import OrderSchema from "./orderSchema.js";

export const insertProduct = (obj) => {
  return OrderSchema(obj).save();
};

export const getProducts = () => {
  return OrderSchema.find();
};

export const getProductById = (_id) => {
  return OrderSchema.findById(_id);
};

export const findOneProductByFilter = (filter) => {
  return OrderSchema.findOne(filter);
};

export const updateProductById = ({ _id, ...rest }) => {
  return OrderSchema.findByIdAndUpdate(_id, rest, { new: true });
};

//@filter, @updateObj must be an obj
export const updateproduct = (filter, updateObj) => {
  return OrderSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deleteproductbyId = (_id) => {
  return OrderSchema.findByIdAndDelete(_id);
};
