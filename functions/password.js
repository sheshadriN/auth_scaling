// password.js
import bcrypt, { hash } from "bcrypt";

const hash_password = (password) => {
  try {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  } catch (error) {
    console.error(error);
  }
};

export default { hash_password };
