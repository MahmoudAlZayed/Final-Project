import { query } from '../config/db.js';
export default {
  getAllProducts: async () => {
    const result = await query('SELECT * FROM products_list');
    return result.rows;
  },

  getProductById: async (id) => {
    const result = await query('SELECT * FROM products_list WHERE id = $1', [id]);
    return result.rows[0];
  },

  createProduct: async (new_product) => {
    const { product, size_id, color_id, quantity } = new_product;
    const result = await query(
      'INSERT INTO products_list (product, size_id, color_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [product, size_id, color_id, quantity]
    );
    return result.rows[0];
  },

  updateProduct: async (id, new_product) => {
    const { name, price, description } = new_product;
    const result = await query(
      'UPDATE products_list SET product = $1, size_id = $2, color_id = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [product, size_id, color_id, quantity, id]
    );
    return result.rows[0];
  },

  deleteProduct: async (id) => {
    const result = await query('DELETE FROM products_list WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};