import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-chat-mlg4.vercel.app",
      "https://mern-chat-khaki-one.vercel.app",
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log("Server running on port Port" + PORT);
    connectDB();
  });
} else {
  connectDB();
}

export default app;
