// password.js
import bcrypt from "bcrypt";

const hash_password = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  } catch (error) {
    console.error(error);
    throw new Error("Error hashing password");
  }
};

export default hash_password;
