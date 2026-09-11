import axios from "axios";
import type { registerType, authResponse, loginType } from "../types/NoteType";

const API_URL = import.meta.env.VITE_AUTH_API;

export const registerUserAPI = async (
  data: registerType,
): Promise<authResponse> => {
  const response = await axios.post(`${API_URL}/register`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const loginUserAPI = async (data: loginType): Promise<authResponse> => {
  const response = await axios.post(`${API_URL}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};
