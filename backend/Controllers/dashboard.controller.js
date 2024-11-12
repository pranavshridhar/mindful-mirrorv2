// dashboard.controller.js

import Journal from "../models/journal.model.js";

export const getUserProgress = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all entries to calculate streaks and frequency
        const entries = await Journal.find({ user: userId }).sort("createdAt");

        // Calculate streaks (consecutive days with an entry)
        let streak = 0;
        let previousDate = null;
        entries.forEach(entry => {
            const entryDate = new Date(entry.createdAt).setHours(0, 0, 0, 0);
            if (previousDate && entryDate === previousDate + 86400000) {
                streak += 1;
            } else {
                streak = 1;
            }
            previousDate = entryDate;
        });

        // Total entries count for overall journaling frequency
        const totalEntries = entries.length;

        res.status(200).json({
            totalEntries,
            currentStreak: streak,
            entriesPerWeek: Math.floor((totalEntries / entries.length) * 7),
        });
    } catch (error) {
        console.error("Error in getUserProgress:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
