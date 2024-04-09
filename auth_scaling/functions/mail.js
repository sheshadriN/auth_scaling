import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendEmail = async (emailTask) => {
  try {
    transporter.sendMail(emailTask, (error, info) => {
      if (error) {
        console.log("erron on sending mail" + error.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Internal server error " + error.message);
  }
};
export default sendEmail;
