const users = [
  {
    id: "1",
    email: "user@test.com",
    role: "user",
  },
  {
    id: "2",
    email: "mod@test.com",
    role: "moderator",
  },
  {
    id: "3",
    email: "admin@test.com",
    role: "admin",
  },
];

const JWT_SECRET = "my_role_base_secret_key_789";

export const loginUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email parameter is required." });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User profile not found." });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    success: true,
    message: `Logged in successfully as ${user.role}!`,
    token,
  });
};

export const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Profile loaded successfully.",
    yourDataDataFetchedFromJwt: req.user,
  });
};

export const adminController = async (req, res) => {
  return res.status(200).json("Admin panel is accessed successfully");
};

export const modController = async (req, res) => {
  return res.status(200).json("Moderator panel is accessed successfully");
};
