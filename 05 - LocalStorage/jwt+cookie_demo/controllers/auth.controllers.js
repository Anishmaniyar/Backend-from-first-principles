import { generatedToken } from "../utils/jwt";

export const authencticatedUser = async (req, res, next) => {
  const token = req.cookies?.jwtToken;
  if (!token) return res.status(401).json("Access Denied");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send(400).json("Invalid email or password");
  }

  if (email == "anish@gmail.com" && password == "anish1234") {
    const user = {
      id: "0000001",
      email: "anish@gmail.com",
      password: "anish1234",
    };

    const token = generatedToken(user);

    res.cookie("jwtToken", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      secure: true,
      httpOnly: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged in successfully" });
  } else {
    return res.status(401).json("Invalid credentials");
  }
};

export const getProfile = async (req, res) => {
  return res.status(201).json("Profile fetched successfully");
};
