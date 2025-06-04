import api from "./api";
import { USE_MOCK } from "../mock-data/config";
import productTypesMockData from "../mock-data/productType.json";

// saveing data in localstorage becaouse mock data is not persistent
// http://localhost:3000/api/productstype


const LOCAL_STORAGE_KEY = "ProductTypes";
let productTypes = [...productTypesMockData];

const loadProductTypes = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    productTypes = JSON.parse(stored);
  } else {
    productTypes = [...productTypes];
  }
};

const saveProductTypes = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productTypes));
};

loadProductTypes();

export const fetchProductTypes = async () => {
  if (USE_MOCK) return productTypes;
  try {
    const res = await api.get("/productstype");
    return res.data;
  } catch (error) {
    console.error("Error fetching product types:", error);
    throw error;
  }
};

export const fetchProductTypeById = async (id: number) => {
  if (USE_MOCK) {
    const productType = productTypes.find((p) => p.id === id);
    if (!productType) throw new Error("Product type not found");
    return productType;
  }
  try {
    const res = await api.get(`/productstype/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product type by ID:", error);
    throw error;
  }
};

export const fetchCreateProductType = async (data: any) => {
  if (USE_MOCK) {
    const newProduct = {
      ...data,
      id: productTypes.length
        ? Math.max(...productTypes.map((p) => p.id)) + 1
        : 1,
    };
    productTypes.push(newProduct);
    console.warn("Mock createProductType - no real insert");
    saveProductTypes();
    return newProduct;
  }
  try {
    const res = await api.post("/productstype", data);
    return res.data;
  } catch (error) {
    console.error("Error creating product type:", error);
    throw error;
  }
};

export const fetchUpdateProductType = async (id: number, data: any) => {
  if (USE_MOCK) {
    const index = productTypes.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product type not found for update");
    productTypes[index] = { ...productTypes[index], ...data };
    saveProductTypes();
    console.warn("Mock updateProductType - no real update");
    return productTypes[index];
  }
  try {
    const res = await api.put(`/productstype/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating product type:", error);
    throw error;
  }
};

export const fetchDeleteProductType = async (id: number) => {
  if (USE_MOCK) {
    productTypes = productTypes.filter((p) => p.id !== id);
    saveProductTypes();
    console.warn("Mock deleteProductType - no real delete");
    return { message: "Product type deleted (mock)" };
  }
  try {
    const res = await api.delete(`/productstype/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product type:", error);
    throw error;
  }
};
