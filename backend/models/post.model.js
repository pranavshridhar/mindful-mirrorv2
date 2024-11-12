// post.model.js

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        entryDate: {
            type: Date,
            default: Date.now, // Timestamp of the entry
        },
        mood: {
            type: String,
            enum: [
                "happy",
                "sad",
                "angry",
                "anxious",
                "neutral",
                "excited",
                "tired",
                "stressed",
                "calm",
                "other",
            ],
            default: "neutral",
        },
        moodIntensity: {
            type: Number,
            min: 1,
            max: 10,
            default: 5, // Intensity of the mood on a scale
        },
        prompts: [
            {
                promptId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Prompt", // Reference to a Prompt model
                },
                promptText: {
                    type: String,
                },
                response: {
                    type: String,
                    required: true,
                },
            },
        ],
        thoughts: {
            type: String,
            required: true, // User's own reflections
        },
        mindfulnessExercises: [
            {
                exerciseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Exercise", // Reference to a Mindfulness Exercise model
                },
                exerciseName: {
                    type: String,
                },
                completed: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        sentimentAnalysis: {
            positivityScore: {
                type: Number,
                min: 0,
                max: 1,
            },
            negativityScore: {
                type: Number,
                min: 0,
                max: 1,
            },
            neutralScore: {
                type: Number,
                min: 0,
                max: 1,
            },
            overallSentiment: {
                type: String,
                enum: ["positive", "negative", "neutral"],
            },
        },
        toneAnalysis: {
            // Optional field for analyzing tone
            type: Map,
            of: Number, // e.g., {'joy': 0.8, 'sadness': 0.1}
        },
        previousEntryReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", // Reference to previous post for contextual adaptation
        },
        customFields: {
            type: Map,
            of: String,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export default mongoose.model("Post", postSchema);
