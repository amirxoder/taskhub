import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async (maxRetries = 5, delayMS = 3000) => {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      await mongoose.connect(env.MONGODB_URI!, {
        maxPoolSize: 20,
        minPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        heartbeatFrequencyMS: 10000,
      });
      console.log("MongoDB connected successfully!");
      return;
    } catch (error) {
      console.warn(`Connection attempt ${i} failed: ${error}`);
      if (i < maxRetries) await new Promise((res) => setTimeout(res, delayMS));
      else
        throw new Error("Could not connect to MongoDB after multiple attempts");
    }
  }
};
