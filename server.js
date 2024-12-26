const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./database/connectdb");
const bookingRoutes = require("./routes/booking");
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
  origin: "https://customizegoapackage.vercel.app", // Your frontend URL
  methods: ["GET", "POST"], // You can add other methods as needed
  allowedHeaders: ["Content-Type", "Authorization"], // Customize headers if needed
};

// Use CORS middleware with specific options
app.use(cors(corsOptions));

app.use("/api/booking", bookingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend!");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
