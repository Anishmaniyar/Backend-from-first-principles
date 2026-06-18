import jwt from "jsonwebtoken";

export const generatedToken = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};
