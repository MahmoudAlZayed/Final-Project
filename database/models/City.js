import { query } from '../config/db.js';

export default {

  getAllCities: async () => {
    const result = await query('SELECT * FROM city');
    return result.rows;
  },

  getCityById: async (id) => {
    const result = await query('SELECT * FROM city WHERE id = $1', [id]);
    return result.rows[0];
  },

  createCity: async (city) => {
    const { city } = city;
    const result = await query(
      'INSERT INTO city (city) VALUES ($1) RETURNING *',
      [city]
    );
    return result.rows[0];
  },

  updateCity: async (id, city) => {
    const { city } = city;
    const result = await query(
      'UPDATE city SET city = $1 WHERE id = $2 RETURNING *',
      [city, id]
    );
    return result.rows[0];
  },

  deleteCity: async (id) => {
    const result = await query('DELETE FROM city WHERE id = $1', [id]);
    return result.rowCount > 0;
  },
};

