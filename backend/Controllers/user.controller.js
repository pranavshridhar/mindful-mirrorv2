export const updateProfile = async (req, res) => {
    try {
        // List of fields allowed to be updated, including personality and questionnaire responses
        const allowedFields = [
            "name",
            "username",
            "headline",
            "about",
            "location",
            "profilePicture",
            "bannerImg",
            "skills",
            "experience",
            "education",
            "personalityResponses", // Field for storing personality test answers
            "petPeeves", // Field for indirectly gathered pet peeves
            "approachToChallenges" // Field for how the user approaches thought processes
        ];

        // Construct updated data from allowed fields only
        const updatedData = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updatedData[field] = req.body[field];
            }
        }

        // Ensure there is something to update
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        // Update user profile in the database
        const userId = req.user._id; // assuming `req.user` contains authenticated user ID (e.g., from middleware)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true, runValidators: true } // `new: true` returns the updated document
        ).select("-password"); // Exclude password field from response

        // Check if user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send updated user profile in response
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.log("Error in updateProfile:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
import Journal from "../models/journal.model.js";

const createJournalEntry = async (userId, content, mood, tone, insights = []) => {
    const journalEntry = new Journal({
        user: userId,
        content,
        mood,
        tone,
        insights,
    });
    await journalEntry.save();
    return journalEntry;
};

import Notification from "../models/notification.model.js";

const createNotification = async (userId, type, title, message, moodContext = null, toneContext = null, link = null) => {
    const notification = new Notification({
        user: userId,
        type,
        title,
        message,
        moodContext,
        toneContext,
        link,
    });
    await notification.save();
    return notification;
};

const markNotificationAsRead = async (notificationId) => {
    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true, readAt: Date.now() },
        { new: true }
    );
    return notification;
};
const getJournalEntriesByDate = async (userId, date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const entries = await Journal.find({
        user: userId,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    return entries;
};
const getJournalFrequency = async (userId, startDate, endDate) => {
    const entries = await Journal.find({
        user: userId,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    const frequency = entries.length; // Total number of entries in the date range
    return frequency;
};

