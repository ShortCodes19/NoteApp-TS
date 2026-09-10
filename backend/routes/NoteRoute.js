import express from "express";
import protectedRoute from "../middleware/authMiddleware.js";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/NoteController.js";

const router = express.Router();

router.post("/", protectedRoute, createNote);
router.get("/", protectedRoute, getNotes);
router.get("/:id", protectedRoute, getNote);
router.put("/:id", protectedRoute, updateNote);
router.delete("/:id", protectedRoute, deleteNote);

export default router;
