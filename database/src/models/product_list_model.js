import { DataTypes} from 'sequelize';
import sequelize from '../config/db.js';
import Sizes from './sizes_model.js';
import Color from './colors_model.js';
import Products_type from './product_type_model.js';

const Products_list = sequelize.define('Product_list', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
  },
    product: { 
        type: DataTypes.STRING,
        references: {
            model: Products_type,
            key: 'id',
    }},
    size_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Sizes,
            key: 'id',
        },
    },
    color_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Color,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER},
}, {
  timestamps: false,
  tableName: "products_list",
});

export default Products_list;
