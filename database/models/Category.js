import { query } from '../config/db.js';

export default {

  getAllCategories: async () => {
    const result = await query('SELECT * FROM categories');
    return result.rows;
  },

  getCategoryById: async (id) => {
    const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  },

  createCategory: async (category) => {
    const { category } = category;
    const result = await query(
      'INSERT INTO categories (category) VALUES ($1) RETURNING *',
      [category]
    );
    return result.rows[0];
  },

  updateCategory: async (id, category) => {
    const { category } = category;
    const result = await query(
      'UPDATE categories SET category = $1 WHERE id = $2 RETURNING *',
      [category, id]
    );
    return result.rows[0];
  },

  deleteCategory: async (id) => {
    const result = await query('DELETE FROM categories WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};

