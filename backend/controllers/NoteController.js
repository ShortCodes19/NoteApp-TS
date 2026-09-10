import mongoose from "mongoose";
import Note from "../models/NoteModel.js";
import asyncHandler from "express-async-handler";

export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create(req.body);

  return res.status(201).json({
    message: "Note created",
    note,
  });
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  return res.status(200).json(notes);
});

export const getNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid note id",
    });
  }
  const note = await Note.findById(req.params.id);

  return res.status(200).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid note id",
    });
  }

  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  return res.status(200).json({
    message: "Note updated",
    note,
  });
});
