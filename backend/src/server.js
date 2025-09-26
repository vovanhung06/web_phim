import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import cors from "cors";
import movieRoutes from './routes/movieRoutes.js';   // <-- import default
import genreRoutes from "./routes/genreRoutes.js"; // <-- import default

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use('/api/movies', movieRoutes);
app.use("/api/genres", genreRoutes)




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});
