import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '3d' } // Token expiration time (3 days)
        );

        // Set the JWT in an HTTP-only cookie with a 3-day expiration
        res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            secure: process.env.NODE_ENV === "production", // Secure flag only in production
            sameSite: "strict"
        });

        // Nodemailer configuration for sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // For Gmail; you can also use other services or SMTP
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS  // Your email password or app-specific password
            }
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Welcome to Our Platform!',
            text: `Hello ${newUser.name},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nYour Team`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(201).json({ message: "User created successfully and welcome email sent!" });

    } catch (error) {
        // Handle errors
        console.log("Error in Sign Up: ", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// Define login and logout functions separately
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '3d' } // Token expiration time (3 days)
        );

        // Set the JWT in an HTTP-only cookie
        res.cookie("jwt-linkedin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        // Send success response
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log("Error in Login: ", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

export const logout = (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("jwt-linkedin", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in Logout: ", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
export const getCurrentUser = async (req, res) => {
    try {
        // Check if the JWT token is available in the cookie
        const token = req.cookies["jwt-linkedin"];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided. Unauthorized access." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user based on the decoded token's userId
        const user = await User.findById(decoded.userId).select("-password"); // Exclude the password field
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user data
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error in getCurrentUser:", error.message);
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};
