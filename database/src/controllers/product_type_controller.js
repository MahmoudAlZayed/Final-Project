import { Products_type } from "../models/index.js";

export const createProducts_type = async (req, res) => {
  try {
    const product = await Products_type.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts_type = async (req, res) => {
  try {
    const products = await Products_type.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts_typeById = async (req, res) => {
  try {
    const product = await Products_type.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Products_type not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProducts_type = async (req, res) => {
  try {
    const product = await Products_type.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Products_type not found" });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProducts_type = async (req, res) => {
  try {
    const product = await Products_type.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Products_type not found" });

    await product.destroy();
    res.json({ message: "Products_type deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
