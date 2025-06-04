import api from "./api";
import { USE_MOCK } from "../mock-data/config";
import category from "../mock-data/category.json";
import { CategoryType } from "../types";

//http://localhost:3000/api/category

let mockCategorys: CategoryType[] = [...category];

export const fetchCategory = async () => {
  if (USE_MOCK) return mockCategorys;
  try {
    const res = await api.get("/category");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCategoryById = async (id: number) => {
  if (USE_MOCK) {
    const category = mockCategorys.find((cat) => cat.id === id);
    if (!category) throw new Error("Category not found");
    return category;
  }
  try {
    const res = await api.get(`/category/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};

export const fetchUpdateCategory = async (id: number, data: any) => {
  if (USE_MOCK) {
    console.warn("Mock updateCategory - no real update");
    return { id, ...data };
  }
  try {
    const res = await api.put(`/category/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const fetchDeleteCategory = async (id: number) => {
  if (USE_MOCK) {
    console.warn("Mock deleteCategory - no real delete");
    return { message: "Category deleted (mock)" };
  }
  try {
    const res = await api.delete(`/category/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
