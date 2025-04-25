import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import axios from "axios";

const router = express.Router();

dotenv.config();
const app = express();
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  poer: process.env.DB_PORT,
});
app.use(express.json());

app.listen(3000, () => {
    console.log("The server is running on port 3000");
  });
  