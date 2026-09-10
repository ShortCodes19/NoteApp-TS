import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/AppDB.js";
import { errorMiddleware, notFound } from "./middleware/errorMiddleware.js";
import NoteRoute from "./routes/NoteRoute.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("App is running");
});

// routes
app.use("/api/notes", NoteRoute);
app.use("/api/auth", authRoutes);

// error Middlewares
app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 2020;

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
