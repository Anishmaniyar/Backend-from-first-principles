export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in first.",
      });
    }

    const hasPermission = allowedRoles.includes(req.user.role);

    if (hasPermission) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access denied for role '${req.user.role}'`,
      });
    }
  };
};
