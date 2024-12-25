import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Seerver started at http://localhost:5000");
});
