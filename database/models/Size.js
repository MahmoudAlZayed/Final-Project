import { query } from '../config/db.js';

export default {

  getAllSizes: async () => {
    const result = await query('SELECT * FROM size');
    return result.rows;
  },

  getSizeById: async (id) => {
    const result = await query('SELECT * FROM size WHERE id = $1', [id]);
    return result.rows[0];
  },

  createSize: async (size) => {
    const { size } = size;
    const result = await query(
      'INSERT INTO size (size) VALUES ($1) RETURNING *',
      [size]
    );
    return result.rows[0];
  },

  updateSize: async (id, size) => {
    const { size } = size;
    const result = await query(
      'UPDATE size SET size = $1 WHERE id = $2 RETURNING *',
      [size, id]
    );
    return result.rows[0];
  },

  deleteSize: async (id) => {
    const result = await query('DELETE FROM size WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};

