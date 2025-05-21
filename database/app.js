import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from './src/routes/product.js';
import categoryRoutes from './src/routes/category.js';

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
