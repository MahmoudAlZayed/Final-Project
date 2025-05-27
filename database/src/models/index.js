import sequelize from "../config/db.js";
import Category from "./category_model.js";
import Color from "./colors_model.js";
import Order from "./orders_model.js";
import Sizes from "./sizes_model.js";
import Customer from "./costumers_model.js";
import Products_type from "./product_type_model.js";
import Products_list from "./product_list_model.js";
import Subcategory from "./subcategory_model.js";
import User from "./user.js";

const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

export {
  sequelize, syncModels,
  User,
  Category,
  Color,
  Order,
  Sizes,
  Customer,
  Products_type,
  Products_list,
  Subcategory,
};
