import { connectDB } from "../lib/db.js";

/**
 * Middleware to ensure MongoDB connection is established before processing requests
 * This is especially important for serverless environments where connections may be cold
 */
export const ensureDBConnection = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        return res.status(503).json({
            message: "Database connection unavailable. Please try again.",
            error: error.message
        });
    }
};
