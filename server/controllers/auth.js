import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthUser from "../models/auth_User.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AuthUser.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, id: user._id }); // Include user ID in the response
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ message: error.message });
  }
};
