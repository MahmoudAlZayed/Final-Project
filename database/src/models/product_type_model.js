import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../config/db.js';
import Category from './category_model.js';
import Subcategory from './subcategory_model.js';

const Products_type = sequelize.define('Products_type', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
  },
    product_name: { 
        type: DataTypes.STRING,},
    img_url: { 
        type: DataTypes.STRING,},
    product_details: { 
        type: DataTypes.TEXT,},
    price: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,},
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
    },
    subcategory_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Subcategory,
            key: 'id',
        },
    }, 
}, {
  timestamps: false,
  tableName: "products_type",
});

export default Products_type;
