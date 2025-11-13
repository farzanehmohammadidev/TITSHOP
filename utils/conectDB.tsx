import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/TITShop", {
      serverSelectionTimeoutMS: 5000, 
    });
    isConnected = true;
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
}
