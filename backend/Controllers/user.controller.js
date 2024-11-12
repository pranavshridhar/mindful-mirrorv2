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
