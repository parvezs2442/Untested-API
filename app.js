import express from "express";
import packageRoutes from "./routes/packageRoutes.js";

const app = express();

app.use(express.json());

app.use("/package", packageRoutes);

export default app;