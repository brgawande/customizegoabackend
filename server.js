const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./database/connectdb");
const bookingRoutes = require("./routes/booking");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = 3000;
dotenv.config({
  path: "./.env",
});

connectdb();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  // origin: "http://localhost:5173", // Your frontend URL
  origin: "https://customizegoapackage.vercel.app", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // You can add other methods as needed
  allowedHeaders: ["Content-Type", "Authorization"], // Customize headers if needed
};

// Use CORS middleware with specific options
app.use(cors(corsOptions));

app.use("/api/booking", bookingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend!");
});

app.post("/api/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or use another email service
    auth: {
      user: "brgawande@gmail.com", // Replace with your email
      pass: "kcjd hghz xnat chur", // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: "brgawande@gmail.com",
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
