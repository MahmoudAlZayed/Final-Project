import { Sizes } from '../models/index.js';

export const createSize = async (req, res) => {
  try {
    const size = await Sizes.create(req.body);
    res.status(201).json(size);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSizes = async (req, res) => {
  try {
    const sizes = await Sizes.findAll();
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSizeById = async (req, res) => {
  try {
    const size = await Sizes.findByPk(req.params.id);
    if (!size) return res.status(404).json({ error: 'Size not found' });
    res.json(size);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSize = async (req, res) => {
  try {
    const size = await Sizes.findByPk(req.params.id);
    if (!size) return res.status(404).json({ error: 'Size not found' });

    await size.update(req.body);
    res.json(size);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSize = async (req, res) => {
  try {
    const size = await Sizes.findByPk(req.params.id);
    if (!size) return res.status(404).json({ error: 'Size not found' });

    await size.destroy();
    res.json({ message: 'Size deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
