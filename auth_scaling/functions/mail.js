// import nodemailer from "nodemailer";
import fs from "fs";

const htmlTemplate = fs.readFileSync(
  "./message_broker/otp_mail.html",
  "utf8"
);

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // Correct hostname for Gmail's SMTP server
//   auth: {
//      user: "teamlearnlegacy@gmail.com",
//      pass: "rsnh owvp gduu yqec",
//   },
//  });
 
// const sendEmail = async (emailTask) => {
//   try {
//     transporter.sendMail(emailTask, (error, info) => {
//       if (error) {
//         console.log("erron on sending mail" + error.message);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   } catch (error) {
//     console.log("Internal server error " + error.message);
//   }
// };

import bodyParser from 'body-parser'
import express from 'express'
import nodemailer from 'nodemailer'
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'teamlearnlegacy@gmail.com',
        pass: 'rsnh owvp gduu yqec'
    }
});
const Sendemail = (email,otp)=>{
    try{
            let mailOptions = {
                from: 'teamlearnlegacy@gmail.com',
                to: email,
                subject: "subject",
                html: htmlTemplate.replace("${otpvalue}", otp)
            };
        
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error occurred:', error.message);
                    // res.status(500).send('Error occurred while sending email.');
                } else {
                    console.log('Email sent successfully:', info.response);
                    // res.send('Email sent successfully.');
                }
            });
    }
    catch(err){
        console.log(err);
        // res.status(500).send('Error occurred while sending email.');
    }
}



export default Sendemail;
