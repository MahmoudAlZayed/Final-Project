import dotenv from "dotenv";
dotenv.config();

import app from './app.js';
import { sequelize, syncModels } from './src/models/index.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await syncModels();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Veritabanı bağlantı hatası:", err);
  }
};

start();
