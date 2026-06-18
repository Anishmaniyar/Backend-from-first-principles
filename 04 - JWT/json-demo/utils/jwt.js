import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = { id: user.id, email: user._email, role: user._role };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};
