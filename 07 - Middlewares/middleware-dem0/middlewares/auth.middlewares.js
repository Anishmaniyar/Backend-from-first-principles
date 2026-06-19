export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json("Access Denied");
  }

  const token = authHeader.split(" ")[1];

  if (token) {
    req.user = decodedUser;
    next();
  } else {
    return res.status(401).json("Unauthorized to access");
  }
};
