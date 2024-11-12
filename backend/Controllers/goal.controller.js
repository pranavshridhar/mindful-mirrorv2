// goal.controller.js

export const trackGoalProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const entriesThisWeek = await Journal.countDocuments({
            user: userId,
            createdAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
        });

        const progress = {
            journalProgress: (entriesThisWeek / user.goals.journalFrequency) * 100,
            mindfulnessMinutes: user.goals.mindfulnessMinutes, // Assume it's tracked separately
        };

        res.status(200).json({ progress });
    } catch (error) {
        console.error("Error in trackGoalProgress:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
