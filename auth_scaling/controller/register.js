// register.js
import hash from "../functions/password.js";
import joi from "joi";
import db from "../db.js";
import otpGenerator from "otp-generator";
import connectRabbitmq from "../message_broker/email_services.js";
import jwt from '../functions/jwt.js'
import sendEmail from "../functions/mail.js";



const otpSchema = joi.object({
  email: joi.string().email().required(),
});
const registerSchema = joi.object({
  email:joi.string().email().required(),
  username:joi.string().required(),
  password:joi.string().required(),
  otp:joi.string().required()
})

const getOtp = async (req, res) => {
  const { email } = req.body;

  const { error, value } = otpSchema.validate({ email });
  if (error) {
    res.status(400).send({ message: "Invalid format" });
    return;
  }

  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.connection.query(query, [email], (err, rows) => {
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
        specialChars: false
      });

      // connectRabbitmq(email, otp);
      sendEmail(email,otp)

      db.redisClient.set(
        email,
        otp,
        "EX",
        process.env.OTP_VALID_TIME,
        (err) => {
          if (err) {
            console.log("error on setting key " + err);
          }
          console.log(
            `key set successfully key: ${email} and exipreTime 300 seconds`
          );
        }
      );
      res.status(200).send({ message: "mail send successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  // console.log(req.body);
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).send({ message: "Invalid format" });
    return;
  }

  try {
    const check = await db.redisClient.get(value.email);
    if (check === value.otp) {
      
      value.password = hash.hash_password(value.password);
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.connection.query(query, [value.username, value.email, value.password], (error, rows) => {
        if (error) {
          res.status(500).send({ message: "Internal server error" ,error:error.message});
          return;
        }
        // console.log(rows.insertId);
        const payload = {
          id:rows.insertId,
          role:"ADMIN"
        }
        // console.log(payload);
        const token = jwt.createToken(payload);
        // console.log(token);
        db.redisClient.del(value.email);
        res.status(200).send({ message: "User registered successfully" ,token:token});
      });

    } else {
      res.status(400).send({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};





export default {getOtp,register};
