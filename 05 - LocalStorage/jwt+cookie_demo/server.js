import express from "express";
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

import userRoutes from "./routes/auth.routes";
import errorHandler from "./errorMiddleware";

app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
