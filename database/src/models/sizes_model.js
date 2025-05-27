import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Sizes = sequelize.define('Size', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  size: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false,
  tableName: "sizes",
});

export default Sizes;
