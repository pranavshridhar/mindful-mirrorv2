import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ["breathing", "meditation", "visualization", "gratitude"] },
    duration: Number, // Duration in minutes
    instructions: String,
});

export default mongoose.model("Exercise", exerciseSchema);