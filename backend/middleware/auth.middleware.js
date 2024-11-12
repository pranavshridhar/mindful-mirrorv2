import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Check for token in cookies
        const token = req.cookies["jwt-linkedin"];
        
        // If no token, send unauthorized response
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token"})
        }
        
        // Find the user associated with the token
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach user to request object for access in next middleware/route
        req.user = user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        return res.status(403).json({ message: "Invalid token or unauthorized access." });
    }
};
