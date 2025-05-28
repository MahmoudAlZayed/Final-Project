import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: { 
    type: DataTypes.STRING, allowNull: false },
  last_name: { 
    type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, allowNull: false },
  password: { 
    type: DataTypes.STRING, allowNull: false },
  adress: { 
    type: DataTypes.STRING, allowNull: false },
  city: { 
    type: DataTypes.STRING, allowNull: false },
  zip_code: { 
    type: DataTypes.STRING, allowNull: false },
  phone_number: { 
    type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: false,
  tableName: "customers",
});

export default Customer;
