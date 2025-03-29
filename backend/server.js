import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { router as authRoutes } from "./routes/authRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
