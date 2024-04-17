const jwt = require("jsonwebtoken");
const { AuthSchemaModel } = require("../Models/UserModel");
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.YOUR_SECRET_KEY
    );
    req.user = decoded;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    console.error("Failed to verify token", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await AuthSchemaModel.findOne({ _id: req.user.userId });
  req.user.role = user.role;
  // console.log(req.user.role);
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
};
