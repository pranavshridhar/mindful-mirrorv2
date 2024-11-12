// analytics.controller.js

import Journal from "../models/journal.model.js";

export const getMoodTrend = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user._id;

        // Fetch entries within the date range
        const entries = await Journal.find({
            user: userId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).select("mood createdAt");

        // Calculate mood trend
        const moodCounts = entries.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({ moodTrend: moodCounts });
    } catch (error) {
        console.error("Error in getMoodTrend:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
