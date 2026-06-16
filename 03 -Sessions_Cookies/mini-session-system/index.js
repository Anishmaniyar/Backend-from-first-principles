import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

const app = express();
const port = 3000;

app.use(express.json());

const USERS_DB = {
  "pankaj@example.com": {
    email: "pankaj@example.com",
    passwordHash: "password123",
    name: "Pankaj",
  },
};

const SESSION_STORE = {};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const user = USERS_DB[email];
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const isPasswordValid = password === user.passwordHash;
  if (!isPasswordValid) {
    return res.status(401).send("Invalid credentials");
  }

  const sessionId = crypto.randomBytes(32).toString("hex");

  SESSION_STORE[sessionId] = {
    email: user.email,
    name: user.name,
    createdAt: new Date(),
  };

  res.setHeader("Set-Cookie", `sessionId=${sessionId}; HttpOnly; Path=/`);

  res.send("Login successful");
});

app.get("/profile", (req, res) => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return res.status(401).send("Unauthorized: No session cookie provided");
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("=")),
  );

  const sessionId = cookies.sessionId;

  const session = SESSION_STORE[sessionId];

  if (!session) {
    return res.status(401).send("Unauthorized: Invalid or expired session");
  }

  res.send(`Welcome to your profile, ${session.name}!`);
});

app.post("/logout", (req, res) => {
  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")),
    );
    const sessionId = cookies.sessionId;

    if (sessionId && SESSION_STORE[sessionId]) {
      delete SESSION_STORE[sessionId];
    }
  }

  res.setHeader(
    "Set-Cookie",
    "sessionId=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
  );

  res.send("Logged out successfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
