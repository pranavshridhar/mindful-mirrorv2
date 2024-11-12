import Exercise from "../models/exercise.model.js";

export const getExercisesByType = async (req, res) => {
    try {
        const { type } = req.query;

        const exercises = await Exercise.find({ type });
        res.status(200).json({ exercises });
    } catch (error) {
        console.error("Error in getExercisesByType:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};