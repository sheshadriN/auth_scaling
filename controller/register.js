// register.js
import hash_password from "../functions/password.js";
import joi from "joi";
import db from "../db.js";
import otpGenerator from "otp-generator";

const schema = joi.object({
  email: joi.string().email().required(),
});

const RegisterOtp = async (req, res) => {
  const { email } = req.body;

  const { error, value } = await schema.validate({ email });
  if (error) {
    res.status(400).send({ message: "Invalid format" });
    return;
  }

  try {
    const already_user = `SELECT * FROM users WHERE email = ?`;
    db.connection.query(already_user, [email], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
        return;
      }

      if (rows.length > 0) {
        res.status(400).send({ message: "Email is already registered" });
        return;
      }

      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      db.redisClient.set(email, otp, "EX", 300, (err) => {
        if (err) {
          console.log("error on setting key " + err);
        }
        console.log(
          `key set successfully key: ${email} and exipreTime 300 seconds`
        );
      });
      res.status(200).send({ message: "otp send" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

export default RegisterOtp;
