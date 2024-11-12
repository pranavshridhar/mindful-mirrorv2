import express from "express"
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.routes.js"
import {connectDB} from "./lib/db.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use('/api/v1/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})