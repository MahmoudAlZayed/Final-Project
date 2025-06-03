import axios from "axios";
import { LoginCredentials } from "../types.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchLogin = async (userData: LoginCredentials) => {
  try {
    const response = await axios.post(`${baseURL}/api/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
