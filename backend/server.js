import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"; // Corrected import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

// Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/users",userRoutes);

// Start server and connect to database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
