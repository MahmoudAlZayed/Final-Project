import dotenv from "dotenv";
dotenv.config();

import app from './app.js';
import { sequelize, syncModels } from './src/models/index.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await syncModels();
    app.listen(PORT, () => console.log(`Database server running on port ${PORT}`));
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
};

start();

