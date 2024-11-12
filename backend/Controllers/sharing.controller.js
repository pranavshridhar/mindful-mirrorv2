// sharing.controller.js

export const generateShareableLink = async (req, res) => {
    try {
        const { milestone } = req.body;
        const userId = req.user._id;

        // Generate a unique link with user's milestone
        const shareableLink = `${process.env.APP_URL}/share/${userId}?milestone=${milestone}`;

        res.status(200).json({ message: "Shareable link generated", link: shareableLink });
    } catch (error) {
        console.error("Error in generateShareableLink:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
