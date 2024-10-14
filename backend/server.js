import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);

app.listen(PORT, () => {
  console.log("Server started at this port:" + PORT);
  connectDB();
});
