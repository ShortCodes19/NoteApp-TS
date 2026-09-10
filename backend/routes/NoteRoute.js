import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
} from "../controllers/NoteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);

export default router;
