import amqp from "amqplib";
import sendEmail from "../functions/mail.js";
import fs from "fs";

const htmlTemplate = fs.readFileSync(
  "./message_broker/otp_mail.html",
  "utf8"
);

const connectRabbitmq = async (email, otp) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue_name = "email_queue";
    await channel.assertQueue(queue_name, { durable: true });

    const emailTask = {
      to: email,
      subject: "Hello from RabbitMQ!",
      body: "This is a test email from RabbitMQ.",
      html: htmlTemplate.replace("${otpvalue}", otp),
    };

    channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(emailTask)));
    console.log("Email task is added to the queue");

    channel.consume(
      queue_name,
      async (msg) => {
        const emailTask = JSON.parse(msg.content.toString());
        await sendEmail(emailTask);
        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error connecting with RabbitMQ: " + error);
  }
};

export default connectRabbitmq;
