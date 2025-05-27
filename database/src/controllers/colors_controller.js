import { Color } from '../models/index.js';

export const createColor = async (req, res) => {
  try {
    const color = await Color.create(req.body);
    res.status(201).json(color);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getColorById = async (req, res) => {
  try {
    const color = await Color.findByPk(req.params.id);
    if (!color) return res.status(404).json({ error: 'Color id not found' });
    res.json(color);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateColor = async (req, res) => {
  try {
    const color = await Color.findByPk(req.params.id);
    if (!color) return res.status(404).json({ error: 'Color id not found' });

    await color.update(req.body);
    res.json(color);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByPk(req.params.id);
    if (!color) return res.status(404).json({ error: 'Category id not found' });

    await color.destroy();
    res.json({ message: 'Color deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
