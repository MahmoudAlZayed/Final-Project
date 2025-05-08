import { query } from '../config/db.js';

export default {

  getAllColors: async () => {
    const result = await query('SELECT * FROM colors');
    return result.rows;
  },

  getColorById: async (id) => {
    const result = await query('SELECT * FROM colors WHERE id = $1', [id]);
    return result.rows[0];
  },

  createColor: async (color) => {
    const { color } = color;
    const result = await query(
      'INSERT INTO colors (color) VALUES ($1) RETURNING *',
      [color]
    );
    return result.rows[0];
  },

  updateColor: async (id, color) => {
    const { color } = color;
    const result = await query(
      'UPDATE colors SET color = $1 WHERE id = $2 RETURNING *',
      [color, id]
    );
    return result.rows[0];
  },

  deleteColor: async (id) => {
    const result = await query('DELETE FROM colors WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};


