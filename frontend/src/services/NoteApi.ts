import axios from "axios";
import type { CreateNoteType, NoteType } from "../types/NoteType";

const API_URL = import.meta.env.VITE_NOTE_API;

export const getNotes = async (): Promise<NoteType[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNoteAPI = async (
  note: CreateNoteType,
): Promise<NoteType> => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

export const updateNoteAPI = async (
  id: string,
  note: CreateNoteType,
): Promise<{ message: string; note: NoteType }> => {
  const response = await axios.put(`${API_URL}/${id}`, note);
  return response.data;
};

export const deleteNoteAPI = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
