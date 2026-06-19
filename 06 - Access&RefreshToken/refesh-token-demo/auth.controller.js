import { generateAccessToken, generateRefreshToken } from "./jwt.js";
import jwt from "jsonwebtoken";

export const authenticatedUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Safely check if header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access Denied: Missing or malformed token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Invalid email or password credentials" });
  }

  if (email === "anish@gmail.com" && password === "anish12345") {
    const user = {
      id: "000011111",
      email: "anish@gmail.com",
      role: "user",
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours (Tip: matching your 30 days goal would be: 30 * 24 * 60 * 60 * 1000)
      secure: false,
      httpOnly: true,
    });

    return res.status(201).json({
      message: "Access token was generated successfully",
      accessToken,
    });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

export const getProfile = async (req, res) => {
  return res.status(200).json("User profile accessed successfully");
};

export const getrefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }

    const user = {
      id: "0001111",
      email: "anish@gmail.com",
      password: "anish12345",
    };

    const tokensAccess = generateAccessToken(user);
    const tokensRefresh = generateRefreshToken(user);

    res.cookie("refreshToken", tokensRefresh, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken: tokensAccess });
  });
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Logged out successfully. Cookie cleared!" });
};
