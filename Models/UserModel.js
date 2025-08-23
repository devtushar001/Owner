import mongoose from "mongoose";
import validator from "validator";

// Custom function to block <script> tags and dangerous inputs
const noScripts = (value) => {
    if (/<script.*?>.*?<\/script>/gi.test(value)) {
        throw new Error("Scripts are not allowed in input fields");
    }
    return value;
};

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [50, "Name cannot exceed 50 characters"],
            validate: {
                validator: noScripts,
                message: "Invalid characters detected",
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
            validate: {
                validator: noScripts,
                message: "Invalid characters detected",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false, // Hide password in queries
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
            validate: {
                validator: noScripts,
                message: "Invalid characters detected",
            },
        },
        address: {
            type: String,
            trim: true,
            validate: {
                validator: noScripts,
                message: "Invalid characters detected",
            },
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        profileImage: {
            type: String,
            default: "",
            validate: {
                validator: (val) => validator.isURL(val) || val === "",
                message: "Please provide a valid image URL",
            },
        },
    },
    { timestamps: true }
);

export const userModel =
    mongoose.models.User || mongoose.model("User", userSchema);