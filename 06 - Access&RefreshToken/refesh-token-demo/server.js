import express from "express";
const app = express();
const port = 3000;
import "dotenv/config";

app.use(express.json());

import userRoutes from "./auth.route.js";

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
