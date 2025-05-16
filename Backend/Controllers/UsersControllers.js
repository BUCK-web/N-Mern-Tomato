import UserModel from "../models/UsersModle.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";


const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid email address" });
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({
        sucess: false,
        message: "Password must be at least 6 characters long",
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }
    const HashedPassword = bcrypt.hashSync(password, 10);
    const CreateUser = await UserModel.create({
      name,
      email,
      password: HashedPassword,
    });
    res.json({ user: CreateUser });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Error in creating user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({token:token});
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in logging in user" });
  }
};


const profile = async (req, res) => {  
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ success: false, message: "Not Logged In" });
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.status(403).json({ success: false, message: "Invalid token" });
      }
      res.json({ success: true, user: decoded , token : token });
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const Logout = async (req, res) => {
  res
    .cookie("token", "")
    .json({ success: true, message: "the token has been logged out" });
};
export { addUser, loginUser, profile, Logout };
