import bcrypt from "bcryptjs";

export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};
