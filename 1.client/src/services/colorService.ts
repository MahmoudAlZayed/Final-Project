import api from "./api";
import { USE_MOCK } from "../mock-data/config";
import colorMockData from "../mock-data/colors.json";
import { ColorType } from "../types";

//http://localhost:3000/api/colors

const LOCAL_STORAGE_KEY = "color";
let color: ColorType[] = [...colorMockData];

const loadColor = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    color = JSON.parse(stored);
  } else {
    color = [...colorMockData];
  }
};

const saveColor = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(color));
};

loadColor();

export const fetchColors = async () => {
  if (USE_MOCK) return color;
  try {
    const res = await api.get("/colors");
    console.log(res)
    return res.data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
};

export const fetchColorById = async (id: number) => {
  if (USE_MOCK) {
    const colorItem = color.find((col) => col.id === id);
    saveColor();
    if (!colorItem) throw new Error("Color not found");
    return colorItem;
  }
  try {
    const res = await api.get(`/colors/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching color by ID:", error);
    throw error;
  }
};

export const fetchUpdateColor = async (
  id: number,
  data: any
): Promise<ColorType> => {
  if (USE_MOCK) {
    const index = color.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Color not found for update");
    color[index] = { ...color[index], ...data };
    saveColor();
    console.warn("Mock updateColor - no real update");
    return color[index];
  }
  try {
    const res = await api.put(`/colors/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating color:", error);
    throw error;
  }
};

export const fetchDeleteColor = async (
  id: number
): Promise<{ message: string }> => {
  if (USE_MOCK) {
    color = color.filter((c) => c.id !== id);
    saveColor();
    console.warn("Mock deleteColor - no real delete");
    return { message: "Color deleted (mock)" };
  }
  try {
    const res = await api.delete(`/colors/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting color:", error);
    throw error;
  }
};
