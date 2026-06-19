export const protectedController = async (req, res) => {
  return res.send(200).json("User data fetched successfully");
};
