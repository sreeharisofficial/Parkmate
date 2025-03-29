import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../routes/authRoutes.js";

const JWT_SECRET = process.env.SECRET_KEY || "secretkey";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(403).json({ error: "Unauthorized: No token" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
  });

  req.user = decoded; // Store user details in request object
  next();
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }
    next();
  };
};

export { verifyToken, authorizeRole };
