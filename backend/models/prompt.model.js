// prompt.model.js
import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["mood", "tone", "goal", "reflection"],
        required: true,
    },
    moodContext: String, // e.g., "happy", "sad"
    toneContext: String, // e.g., "reflective", "optimistic"
    promptText: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Prompt", promptSchema);

// prompt.controller.js
import Prompt from "../models/prompt.model.js";

export const suggestPrompt = async (req, res) => {
    try {
        const { mood, tone } = req.query; // User's current mood and tone from query

        const prompts = await Prompt.find({
            $or: [{ moodContext: mood }, { toneContext: tone }, { category: "reflection" }],
        });

        res.status(200).json({ prompts });
    } catch (error) {
        console.error("Error in suggestPrompt:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
