import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Color = sequelize.define('Color', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  color: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false,
  tableName: "colors",
});

export default Color;
