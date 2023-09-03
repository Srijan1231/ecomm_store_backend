import bcrypt from "bcryptjs";
const salt = 10;

export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, salt);
};

export const comparePassword = (plainPass, hashPass) => {
  return bcrypt.compareSync(plainPass, hashPass);
};
