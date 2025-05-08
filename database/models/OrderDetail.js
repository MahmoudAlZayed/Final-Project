import { query } from '../config/db.js';

export default {
  getAllOrderDetails: async () => {
    const result = await query('SELECT * FROM order_details');
    return result.rows;
  },

  getOrderDetailById: async (id) => {
    const result = await query('SELECT * FROM order_details WHERE id = $1', [id]);
    return result.rows[0];
  },

  createOrderDetail: async (orderDetail) => {
    const { order_id, product_id, quantity, price } = orderDetail;
    const result = await query(
      'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, product_id, quantity, price]
    );
    return result.rows[0];
  },

  updateOrderDetail: async (id, orderDetail) => {
    const { order_id, product_id, quantity, price } = orderDetail;
    const result = await query(
      'UPDATE order_details SET order_id = $1, product_id = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *',
      [order_id, product_id, quantity, price, id]
    );
    return result.rows[0];
  },

  deleteOrderDetail: async (id) => {
    const result = await query('DELETE FROM order_details WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};