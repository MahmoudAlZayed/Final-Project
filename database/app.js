import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import product_type_routes from './src/routes/products_type_routes.js';
import category_routes from './src/routes/category_routes.js';
import colors_routes from './src/routes/colors_routes.js';
import sizes_routes from './src/routes/sizes_routes.js';
import productlist_routes from './src/routes/products_list_routes.js';
import costumers_routes from './src/routes/costumers_routes.js';
import subcategory_routes from './src/routes/subcategory_routes.js';
import orders_routes from './src/routes/orders_routes.js';


const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/api/productstype', product_type_routes);
app.use("/api/category", category_routes);
app.use("/api/colors", colors_routes);
app.use('/api/sizes', sizes_routes);
app.use("/api/orders", orders_routes);
app.use("/api/productslist", productlist_routes);
app.use("/api/customers", costumers_routes); 
app.use("/api/subcategory", subcategory_routes);


export default app;
