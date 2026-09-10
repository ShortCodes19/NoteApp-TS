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
