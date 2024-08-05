import categoriesRoutes from "./routes/categories.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";
import incomesRoutes from "./routes/incomes.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// MIDELEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); //Configura el servidor para que pueda recibir solicitudes con formato JSON
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", incomesRoutes);
app.use("/api", expensesRoutes);

export default app;
