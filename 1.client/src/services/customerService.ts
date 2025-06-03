import api from "./api";
import { USE_MOCK } from "../mock-data/config";
import customerMockData from "../mock-data/customer.json";
import { CustomerType } from "../types";

const LOCAL_STORAGE_KEY = "customer";
let customer: CustomerType[] = [...customerMockData];

const loadCustomer = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    customer = JSON.parse(stored);
  } else {
    customer = [...customerMockData];
  }
};

const saveCustomer = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customer));
};

loadCustomer();

export const fetchCustomer = async () => {
  if (USE_MOCK) return customer;
  try {
    const res = await api.get("/customer");
    return res.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};
export const fetchCustomerById = async (id: number) => {
  if (USE_MOCK) {
    const item = customer.find((c) => c.id === id);
    if (!item) throw new Error("Customer item not found");
    return item;
  }
  try {
    const res = await api.get(`/customer/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

export const fetchCreateCustomer = async (data: any) => {
  if (USE_MOCK) {
    const newItem = {
      ...data,
      id: customer.length ? Math.max(...customer.map((c) => c.id || 0)) + 1 : 1,
    };
    customer.push(newItem);
    saveCustomer();
    console.warn("Mock createCustomer - no real insert");
    return newItem;
  }
  try {
    const res = await api.post("/customer", data);
    return res.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const fetchUpdateCustomer = async (id: number, data: any) => {
  if (USE_MOCK) {
    const index = customer.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Customer item not found");
    customer[index] = { ...customer[index], ...data };
    saveCustomer();
    console.warn("Mock updateCustomer - no real update");
    return customer[index];
  }
  try {
    const res = await api.put(`/customer/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const fetchDeleteCustomer = async (id: number) => {
  if (USE_MOCK) {
    const index = customer.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Customer item not found");
    const deletedItem = customer.splice(index, 1)[0];
    saveCustomer();
    console.warn("Mock deleteCustomer - no real delete");
    return deletedItem;
  }
  try {
    const res = await api.delete(`/customer/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
