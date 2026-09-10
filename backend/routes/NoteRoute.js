import express from "express";
import {
  createNote,
  getNotes,
  getNote,
} from "../controllers/NoteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNote);

export default router;
