import Journal from "../models/journal.model.js";

// 1. Create a New Journal Entry
export const createJournalEntry = async (req, res) => {
    try {
        const { content, mood, tone, insights } = req.body;
        const userId = req.user._id; // Assuming user ID is set by middleware

        // Validate required fields
        if (!content || !mood || !tone) {
            return res.status(400).json({ message: "Content, mood, and tone are required" });
        }

        // Create a new journal entry
        const journalEntry = new Journal({
            user: userId,
            content,
            mood,
            tone,
            insights,
        });

        await journalEntry.save();
        res.status(201).json({ message: "Journal entry created successfully", journalEntry });
    } catch (error) {
        console.log("Error in createJournalEntry:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// 2. Get All Journal Entries for a User
export const getAllJournalEntries = async (req, res) => {
    try {
        const userId = req.user._id;

        const journalEntries = await Journal.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(journalEntries);
    } catch (error) {
        console.log("Error in getAllJournalEntries:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// 3. Get Journal Entries by Date
export const getJournalEntriesByDate = async (req, res) => {
    try {
        const { date } = req.query; // Date provided in the query parameters
        const userId = req.user._id;

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const entries = await Journal.find({
            user: userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        res.status(200).json(entries);
    } catch (error) {
        console.log("Error in getJournalEntriesByDate:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// 4. Update a Journal Entry
export const updateJournalEntry = async (req, res) => {
    try {
        const { id } = req.params; // ID of the journal entry to update
        const { content, mood, tone, insights } = req.body;
        const userId = req.user._id;

        // Find and update the journal entry
        const updatedEntry = await Journal.findOneAndUpdate(
            { _id: id, user: userId },
            { content, mood, tone, insights, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        res.status(200).json({ message: "Journal entry updated successfully", updatedEntry });
    } catch (error) {
        console.log("Error in updateJournalEntry:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// 5. Delete a Journal Entry
export const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const deletedEntry = await Journal.findOneAndDelete({ _id: id, user: userId });

        if (!deletedEntry) {
            return res.status(404).json({ message: "Journal entry not found" });
        }

        res.status(200).json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        console.log("Error in deleteJournalEntry:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// 6. Get Journal Frequency Over a Date Range
export const getJournalFrequency = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user._id;

        const entries = await Journal.find({
            user: userId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });

        const frequency = entries.length;
        res.status(200).json({ message: "Journal frequency retrieved successfully", frequency });
    } catch (error) {
        console.log("Error in getJournalFrequency:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
