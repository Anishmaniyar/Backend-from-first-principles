import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
