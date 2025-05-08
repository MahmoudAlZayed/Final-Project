import { query } from '../config/db.js';
export default {
  getAllProducts: async () => {
    const result = await query('SELECT * FROM products');
    return result.rows;
  },

  getProductById: async (id) => {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  createProduct: async (product) => {
    const { product_name, product_details, price, category_id, size_id, color_id, quantity } = product;
    const result = await query(
      'INSERT INTO products (product_name, product_details, price, category_id, size_id, color_id, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [product_name, product_details, price, category_id, size_id, color_id, quantity]
    );
    return result.rows[0];
  },

  updateProduct: async (id, product) => {
    const { name, price, description } = product;
    const result = await query(
      'UPDATE products SET product_name = $1, product_details = $2, price = $3, category_id = $4, size_id = $5, color_id = $6, quantity = $7 WHERE id = $8 RETURNING *',
      [product_name, product_details, price, category_id, size_id, color_id, quantity, id]
    );
    return result.rows[0];
  },

  deleteProduct: async (id) => {
    const result = await query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};