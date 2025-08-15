import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payments.js";
import contactRoutes from "./routes/contact.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://socialmediamanagement3.netlify.app",
      "http://localhost:5173",
      "https://social-media-management-q7vq.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API",
    version: "1.0.0",
    documentation: "/api/docs",
  });
});
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
