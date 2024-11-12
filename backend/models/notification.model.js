import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User who receives the notification
        required: true,
    },
    type: {
        type: String,
        enum: [
            "reflection_reminder",       // Reminder to reflect or journal
            "mood_check_in",             // Prompt to check in on their current mood
            "prompt_suggestion",         // Suggest a prompt based on recent entries or mood
            "mindfulness_reminder",      // Reminder for mindfulness exercises (e.g., breathing, meditation)
            "milestone_achievement",     // Congratulatory message for reaching a milestone (e.g., number of reflections)
            "personalized_insight",      // Insight based on user's recent entries or progress
            "system_alert"               // System or app updates
        ],
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    moodContext: {
        type: String,
        enum: ["happy", "sad", "angry", "anxious", "calm", "neutral"], // Context of user's mood, if applicable
        default: null,
    },
    toneContext: {
        type: String,
        enum: ["positive", "negative", "neutral", "reflective", "optimistic", "pessimistic"], // Tone context for personalized notifications
        default: null,
    },
    link: {
        type: String, // Link to direct the user to relevant content in the app (e.g., reflection page, mindfulness exercise)
        default: null,
    },
    isRead: {
        type: Boolean,
        default: false, // Tracks if the notification has been read
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    readAt: {
        type: Date, // Timestamp for when the user read the notification
        default: null,
    },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
   