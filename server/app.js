import userRoutes from "./routes/user.routes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);

export default app;
