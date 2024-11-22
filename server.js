// const express = require("express");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// app.post("/contact-us", async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res
//       .status(400)
//       .json({ error: "Missing required fields: to, subject, or html" });
//   }

//   const mailOptions = {
//     from: {
//       name: process.env.APP_NAME,
//       address: process.env.EMAIL,
//     },
//     to: ["anuragchauhan1923@gmail.com"],
//     subject: "New Order",
//     html: `<p>${message}</p>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://agencysl.vercel.app",
];

// Enable CORS for requests from your frontend
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// Middleware to parse JSON requests
app.use(express.json());

// Nodemailer transporter setup
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

// Contact Us route
app.post("/contact-us", async (req, res) => {
  const { to, subject, html } = req.body;

  // Validate required fields
  if (!to || !subject || !html) {
    return res
      .status(400)
      .json({ error: "Missing required fields: to, subject, or html" });
  }

  const mailOptions = {
    from: {
      name: process.env.APP_NAME,
      address: process.env.EMAIL,
    },
    to,
    subject,
    html,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
