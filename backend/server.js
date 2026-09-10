import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/AppDB.js";
import NoteRoute from "./routes/NoteRoute.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", NoteRoute);

// Error handling — must be registered AFTER all routes
app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
