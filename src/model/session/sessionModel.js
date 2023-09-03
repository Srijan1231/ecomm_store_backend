import SessionSchema from "./sessionSchema.js";

export const insertNewSession = (obj) => {
  return SessionSchema(obj).save();
};

// @token should be a string
export const deleteSession = async (token) => {
  const dt = await SessionSchema.findOneAndDelete({ token });
};
