import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/AppDB.js";
import NoteRoute from "./routes/NoteRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/notes", NoteRoute);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
