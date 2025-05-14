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
    const { order_id, product_id, quantity} = orderDetail;
    const result = await query(
      'INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [order_id, product_id, quantity]
    );
    return result.rows[0];
  },

  updateOrderDetail: async (id, orderDetail) => {
    const { order_id, product_id, quantity, price } = orderDetail;
    const result = await query(
      'UPDATE order_details SET order_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [order_id, product_id, quantity, id]
    );
    return result.rows[0];
  },

  deleteOrderDetail: async (id) => {
    const result = await query('DELETE FROM order_details WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};