import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const JWT_SECRET = process.env.SECRET_KEY || "secretkey";

const tokenBlacklist = new Set();

//REGISTER USER

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, email, password: hashedPassword, role });
    if (!["admin", "user", "operator"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({ error: error.message });
  }
});

//LOGIN USER

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "15d",
  });

  res.json({ token, role: user.role });
});

//LOGOUT
router.post("/logout", verifyToken, (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Add the token to the blacklist
    tokenBlacklist.add(token);
    
    // Respond successfully
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//PROTECTED ROUTES

router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin Access Granted" });
});
router.get("/user", verifyToken, authorizeRole("user"), (req, res) => {
  res.json({ message: "User Access Granted" });
});
router.get("/operator", verifyToken, authorizeRole("operator"), (req, res) => {
  res.json({ message: "Operator Access Granted" });
});
export { router, tokenBlacklist };
