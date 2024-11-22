const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const options = {
  from: {
    name: process.env.APP_NAME,
    address: process.env.EMAIL,
  },
  to: ["anuragchauhan1923@gmail.com"],
  subject: "Hello from here ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

const sendMail = async (transporter, options) => {
  try {
    await transporter.sendMail(options);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

sendMail(transporter, options);
