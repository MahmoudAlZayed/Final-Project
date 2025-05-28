import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Subcategory = sequelize.define('Subcategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subcategory: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false,
  tableName: "subcategories",
});

export default Subcategory;
