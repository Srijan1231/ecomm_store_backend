import OrderSchema from "./orderSchema.js";

export const insertOrder = (obj) => {
  return OrderSchema(obj).save();
};

export const getOrders = () => {
  return OrderSchema.find();
};

export const getOrderById = (_id) => {
  return OrderSchema.findById(_id);
};

export const findOneOrderByFilter = (filter) => {
  return OrderSchema.findOne(filter);
};

export const updateOrderById = ({ _id, ...rest }) => {
  return OrderSchema.findByIdAndUpdate(_id, rest, { new: true });
};

//@filter, @updateObj must be an obj
export const updateOrder = (filter, updateObj) => {
  return OrderSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deleteOrderbyId = (_id) => {
  return OrderSchema.findByIdAndDelete(_id);
};
