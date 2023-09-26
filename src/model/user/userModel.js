import userSchema from "./userSchema.js";

export const insertUser = (obj) => {
  return userSchema(obj).save();
};

export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

export const getOneUser = (filter) => {
  return userSchema.findOne(filter);
};

export const updateUserById = (_id, obj) => {
  return userSchema.findByIdAndUpdate(_id, obj);
};
//@filter, @updateObj must be an obj
export const updateUser = (filter, updateObj) => {
  return userSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deleteUser = (_id) => {
  return userSchema.findByIdAndDelete(_id);
};
