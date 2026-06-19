import express from "express";
const app = express();
const port = 3000;

import userRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/error.middlewares.js";

app.use(express.json());
app.use(morgan());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
