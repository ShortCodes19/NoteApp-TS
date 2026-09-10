import axios from "axios";

const API_URL = import.meta.env.VITE_NOTE_API;

export const getNotesAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
