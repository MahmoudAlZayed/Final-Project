import sequelize from "../config/db.js";
import User from "./user.js";
import Product from './product.js';
import Category from './category.js';


const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

export {
  sequelize, syncModels,
  User,
  Product,
  Category
};
