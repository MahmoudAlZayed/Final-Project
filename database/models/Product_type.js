import { query } from '../config/db.js';
export default {
  getAllProductTypes: async () => {
    const result = await query('SELECT * FROM products_type');
    return result.rows;
  },

  getProductTypeById: async (id) => {
    const result = await query('SELECT * FROM products_type WHERE id = $1', [id]);
    return result.rows[0];
  },

  createProductType: async (product) => {
    const { product_name, img_url, product_details, price, category_id, subcategory_id} = product;
    const result = await query(
      'INSERT INTO products_type (product_name, img_url, product_details, price, category_id, subcategory_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [product_name, img_url, product_details, price, category_id, subcategory_id]
    );
    return result.rows[0];
  },

  updateProductType: async (id, product) => {
    const { name, price, description } = product;
    const result = await query(
      'UPDATE products_type SET product_name = $1, img_url = $2, product_details = $3, price = $4, category_id = $5, subcategory_id = $6 WHERE id = $7 RETURNING *',
      [product_name, product_details, price, category_id, subcategory_id, id]
    );
    return result.rows[0];
  },

  deleteProductType: async (id) => {
    const result = await query('DELETE FROM products_type WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};