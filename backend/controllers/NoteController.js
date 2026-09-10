import mongoose from "mongoose";
import Note from "../models/NoteModel.js";
import asyncHandler from "express-async-handler";

export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create({ ...req.body, user: req.userId });

  return res.status(201).json({
    message: "Note created",
    note,
  });
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.userId });

  return res.status(200).json(notes);
});

export const getNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid note id",
    });
  }

  const note = await Note.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  return res.status(200).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid note id",
    });
  }

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  return res.status(200).json({
    message: "Note updated",
    note,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid note id",
    });
  }

  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  return res.status(200).json({
    message: "Note deleted!",
  });
});
