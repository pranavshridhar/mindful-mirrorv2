import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"; // Corrected import
import journalRoutes from "/Users/vijayalaxmikrishnan/mindful-mirrorv2/backend/models/journal.model.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
import cors from "cors";
app.use(cors({ origin: "http://localhost:3001" })); // Replace with your frontend URL


// Middleware
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

// Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/journal", journalRoutes);


// Start server and connect to database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
