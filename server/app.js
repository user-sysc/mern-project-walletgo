import categoriesRoutes from "./routes/categories.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";
import incomesRoutes from "./routes/incomes.routes.js";
import userRoutes from "./routes/user.routes.js";
import express from "express";
import cors from "cors";

const app = express();

// MIDELEWARES
//Configura el servidor para que pueda recibir solicitudes con formato JSON
app.use(express.json());
//Configura el servidor para que acepte solicitudes de cualquier origen
app.use(cors());

app.use(userRoutes);
app.use(incomesRoutes);
app.use(expensesRoutes);
app.use(categoriesRoutes);

export default app;
