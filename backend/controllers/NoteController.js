import Note from "../models/NoteModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

export const getNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid Note ID",
    });
  }

  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }
  res.status(200).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid Note ID",
    });
  }

  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(200).json({
    message: "Note updated",
    note,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid Note ID",
    });
  }

  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }
  res.status(200).json({
    message: "Note deleted!",
  });
});
