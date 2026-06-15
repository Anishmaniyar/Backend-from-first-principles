import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Invalid details" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed Password:", hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);

    res.json({
      message: "User signed up successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during encryption" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const mockStoredHash = "$2b$10$xyz...your_stored_hash_string";

  const isMatch = await bcrypt.compare(password, mockStoredHash);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ message: "Login successful!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
