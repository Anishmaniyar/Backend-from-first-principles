import jwt from "jsonwebtoken";

const JWT_SECRET = "my_role_base_secret_key_789";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. Token missing." });
  }

  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    req.user = decodedPayload;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
