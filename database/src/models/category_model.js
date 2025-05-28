import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false,
  tableName: "categories",
});

export default Category;
