import { generateToken } from "../utils/jwt";

const dummyUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "securePassword456",
  },
  {
    name: "Alex Jones",
    email: "alex@example.com",
    password: "mySecretPassword789",
  },
];

export const authenticatedToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(new ApiError("Access Denied", 401));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide valid email and password", 400));
  }

  if (email == "john@example.com" && password == "password123") {
    const user = {
      id: "000001",
      email: "john@example.com",
      role: "dummy",
    };

    const token = generateToken(user);

    if (!token)
      return next(
        new AppError("Token not generated internal server error", 500),
      );

    return res.status(200).json({ tokenJwt: token });
  } else {
    return next(new AppError("Invalid error or password", 401));
  }
};

export const verifyUser = async (req, res, next) => {
  return res.status(201).json("Dummy user succesfully veried");
};

export const getProfile = async (req, res, next) => {
  return res.status(201).json("Dummy user succeffully eneterd the profille");
};
