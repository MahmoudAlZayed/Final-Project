import { query } from '../config/db.js';

export default {
  getAllOrders: async () => {
    const result = await query('SELECT * FROM orders');
    return result.rows;
  },

  getOrderById: async (id) => {
    const result = await query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  },

  createOrder: async (order) => {
    const { customer_id, total_price } = order;
    const result = await query(
      'INSERT INTO orders (customer_id) VALUES ($1) RETURNING *',
      [customer_id]
    );
    return result.rows[0];
  },

  updateOrder: async (id, order) => {
    const { customer_id, total_price } = order;
    const result = await query(
      'UPDATE orders SET customer_id = $1 WHERE id = $2 RETURNING *',
      [customer_id, id]
    );
    return result.rows[0];
  },

  deleteOrder: async (id) => {
    const result = await query('DELETE FROM orders WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};