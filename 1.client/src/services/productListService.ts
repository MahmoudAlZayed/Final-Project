import api from "./api";
import { USE_MOCK } from "../mock-data/config";
import productListMockData from "../mock-data/productList.json";
import { ProductListType } from "../types";

//http://localhost:3000/api/productslist

const LOCAL_STORAGE_KEY = "productList";
let productList: ProductListType[] = [...productListMockData];

const loadproductList = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    productList = JSON.parse(stored);
  } else {
    productList = [...productListMockData];
  }
};

const saveproductList = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productList));
};

loadproductList();

export const fetchProductList = async () => {
  if (USE_MOCK) return productList;
  try {
    const res = await api.get("/productslist");
    return res.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const fetchProductListById = async (id: number) => {
  if (USE_MOCK) {
    const item = productList.find((p) => p.id === id);
    if (!item) throw new Error("Product list item not found");
    return item;
  }
  try {
    const res = await api.get(`/productslist/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product list by ID:", error);
    throw error;
  }
};

// CREATE
export const fetchCreateProductList = async (data: any) => {
  if (USE_MOCK) {
    const newItem = {
      ...data,
      id: productList.length
        ? Math.max(...productList.map((p) => p.id || 0)) + 1
        : 1,
    };
    productList.push(newItem);
    saveproductList();
    console.warn("Mock createProductList - no real insert");
    return newItem;
  }
  try {
    const res = await api.post("/productslist", data);
    return res.data;
  } catch (error) {
    console.error("Error creating product list item:", error);
    throw error;
  }
};

// UPDATE
export const fetchUpdateProductList = async (id: number, data: any) => {
  if (USE_MOCK) {
    const index = productList.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product list item not found");
    productList[index] = { ...productList[index], ...data };
    saveproductList();
    console.warn("Mock updateProductList - no real update");
    return productList[index];
  }
  try {
    const res = await api.put(`/productslist/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating product list item:", error);
    throw error;
  }
};

// DELETE
export const fetchDeleteProductList = async (id: number) => {
  if (USE_MOCK) {
    productList = productList.filter((p) => p.id !== id);
    saveproductList();
    console.warn("Mock deleteProductList - no real delete");
    return { message: "Product list item deleted (mock)" };
  }
  try {
    const res = await api.delete(`/productslist/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product list item:", error);
    throw error;
  }
};
