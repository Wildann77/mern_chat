import mongoose from "mongoose";

// Cache the connection to reuse across serverless function calls
let cachedConnection = null;

export const connectDB = async () => {
  try {
    // If already connected, reuse the connection
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log("Using cached MongoDB connection");
      return cachedConnection;
    }

    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    // MongoDB connection options optimized for serverless
    const options = {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Socket timeout
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 1, // Minimum number of connections
      maxIdleTimeMS: 10000, // Close connections after 10 seconds of inactivity
      retryWrites: true,
      retryReads: true,
    };

    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URL, options);

    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    cachedConnection = null; // Reset cache on error
    throw error; // Re-throw to handle in calling code
  }
};
