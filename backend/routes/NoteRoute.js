import express from "express";
import { createNote } from "../controllers/NoteController.js";

const router = express.Router();

router.post("/", createNote);

export default router;
