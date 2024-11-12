import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User who wrote the journal entry
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    mood: {
        type: String,
        enum: ["happy", "sad", "angry", "anxious", "calm", "neutral"], // Example moods
        required: true,
    },
    tone: {
        type: String,
        enum: ["positive", "negative", "neutral", "reflective", "optimistic", "pessimistic"], // Example tones
        default: "neutral",
    },
    insights: [
        {
            type: String,
            trim: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;
