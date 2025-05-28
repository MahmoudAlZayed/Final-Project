import { Products_list } from '../models/index.js';

export const createProducts_listcategory = async (req, res) => {
  try {
    const product = await Products_list.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProducts_lists = async (req, res) => {
  try {
    const product = await Products_list.findAll();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts_listById = async (req, res) => {
  try {
    const product = await Products_list.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Products_list not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProducts_list = async (req, res) => {
  try {
    const product = await Products_list.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Products_list not found' });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProducts_list = async (req, res) => {
  try {
    const product = await Products_list.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Products_list not found' });

    await product.destroy();
    res.json({ message: 'Products_list deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
