import api from "./api";
import { USE_MOCK } from "../mock-data/config";
import subcategoryMockData from "../mock-data/subcategory.json";
import { SubCategoryType } from "../types";

//http://localhost:3000/api/subcategory

const LOCAL_STORAGE_KEY = "subcategory";
let subcategory: SubCategoryType[] = [...subcategoryMockData];

const loadSubcategory = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    subcategory = JSON.parse(stored);
  } else {
    subcategory = [...subcategoryMockData];
  }
};

const saveSubcategory = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subcategory));
};

loadSubcategory();

export const fetchSubcategory = async () => {
  if (USE_MOCK) return subcategory;
  try {
    const res = await api.get("/subcategory");
    return res.data;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    throw error;
  }
};

export const fetchSubcategoryById = async (id: number) => {
  if (USE_MOCK) {
    const item = subcategory.find((p) => p.id === id);
    if (!item) throw new Error("Subcategory item not found");
    return item;
  }
  try {
    const res = await api.get(`/subcategory/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching subcategory by ID:", error);
    throw error;
  }
};

export const fetchCreateSubcategory = async (data: any) => {
  if (USE_MOCK) {
    const newItem = {
      ...data,
      id: subcategory.length
        ? Math.max(...subcategory.map((p) => p.id || 0)) + 1
        : 1,
    };
    subcategory.push(newItem);
    saveSubcategory();
    console.warn("Mock createSubcategory - no real insert");
    return newItem;
  }
  try {
    const res = await api.post("/subcategory", data);
    return res.data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
};

export const fetchUpdateSubcategory = async (id: number, data: any) => {
  if (USE_MOCK) {
    const index = subcategory.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Subcategory not found");
    subcategory[index] = { ...subcategory[index], ...data };
    saveSubcategory();
    console.warn("Mock updateSubcategory - no real update");
    return subcategory[index];
  }
  try {
    const res = await api.put(`/subcategory/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
};

export const fetchDeleteSubcategory = async (id: number) => {
  if (USE_MOCK) {
    const index = subcategory.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Subcategory not found");
    subcategory.splice(index, 1);
    saveSubcategory();
    console.warn("Mock deleteSubcategory - no real delete");
    return { message: "Subcategory deleted (mock)" };
  }
  try {
    const res = await api.delete(`/subcategory/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};
