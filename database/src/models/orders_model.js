import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Costumer from './costumers_model.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  customer_id: { 
    type: DataTypes.INTEGER,
    references: {
        model: Costumer,
        key: 'id',
    },
    },
}, {
  timestamps: true,
  tableName: "orders",
});

export default Order;
