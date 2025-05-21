import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Category from './category.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productName: { type: DataTypes.STRING, allowNull: false },
  imageUrl: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

export default Product;
