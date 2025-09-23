import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // thay đổi nếu frontend của bạn chạy ở cổng khác
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // nếu bạn cần gửi cookie/JWT
  })
);
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});
