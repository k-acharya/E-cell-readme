const jwt = require("jsonwebtoken");
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

module.exports = {
  verifyToken,
};
