import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
        validate: {
            validator: function (v) {
                return !/<script.*?>.*?<\/script>/gi.test(v);
            },
            message: "Name must not contain script tags"
        }
    },
    productId: {
        type: String,
        required: [true, "Product ID is required"],
        unique: true,
        trim: true,
        uppercase: true,
        validate: {
            validator: function (v) {
                return /^[A-Z0-9_-]+$/.test(v); // only alphanumeric, -, _
            },
            message: props => `${props.value} is not a valid product ID`
        }
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"]
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: function (arr) {
                return arr.every(tag => typeof tag === 'string' && tag.trim().length > 0);
            },
            message: "Tags must be non-empty strings"
        }
    }
}, {
    timestamps: true
});

export const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);