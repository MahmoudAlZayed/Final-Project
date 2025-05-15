import { query } from '../config/db.js';

export default {
  getAllCustomers: async () => {
    const result = await query('SELECT * FROM customers');
    return result.rows;
  },

  getCustomerById: async (id) => {
    const result = await query('SELECT * FROM customers WHERE id = $1', [id]);
    return result.rows[0];
  },

  createCustomer: async (customer) => {
    const { first_name, last_name, email, password, adress, city, zip_code, phone_number } = customer;
    const result = await query(
      'INSERT INTO customers (first_name, last_name, email, password, adress, city, zip_code, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [first_name, last_name, email, password, adress, city, zip_code, phone_number]
    );
    return result.rows[0];
  },

  updateCustomer: async (id, customer) => {
    const { first_name, last_name, email, password, adress } = customer;
    const result = await query(
      'UPDATE customers SET first_name = $1, last_name = $2, email = $3, password = $4, adress = $5, city = $6, zip_code = $7, phone_number = $8, WHERE id = $9 RETURNING *',
      [first_name, last_name, email, password, adress, id]
    );
    return result.rows[0];
  },

  deleteCustomer: async (id) => {
    const result = await query('DELETE FROM customers WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
}