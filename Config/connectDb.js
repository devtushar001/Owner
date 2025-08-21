import mongoose, { mongo } from 'mongoose';

export const connectDb = async (mongo_url) => {
    try {
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        return error.name;
    }
};