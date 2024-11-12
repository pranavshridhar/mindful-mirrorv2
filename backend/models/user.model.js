import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "Mindful User",
    },
    location: {
        type: String,
        default: "Earth",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [String],
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            school: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number,
        },
    ],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    // New fields for personality insights and reflection
    personalityResponses: [
        {
            question: String,
            response: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
    petPeeves: [String], // Array of strings summarizing user's dislikes or pet peeves
    approachToChallenges: {
        type: String,
        default: "",
        maxlength: 500, // Limit to keep the summary concise
    },
    goals: {
        journalFrequency: { type: Number, default: 3 }, // Times per week, for example
        mindfulnessMinutes: { type: Number, default: 30 }, // Minutes per week
    },
    preferences: {
        notificationFrequency: { type: String, enum: ["daily", "weekly", "monthly"], default: "daily" },
        preferredPromptTypes: [String], // e.g., ["mood", "tone", "reflection"]
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
