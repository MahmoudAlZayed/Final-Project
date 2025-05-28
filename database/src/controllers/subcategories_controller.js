import { Subcategory } from '../models/index.js';

export const createSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSubcategories = async (req, res) => {
  try {
    const subcategory = await Subcategory.findAll();
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });

    await subcategory.update(req.body);
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });

    await subcategory.destroy();
    res.json({ message: 'Subcategory deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
