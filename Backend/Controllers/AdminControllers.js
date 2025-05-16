import AdminModel from '../models/AdminModels.js';
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";


const AdminRegister = async (req, res) => {
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
    const user = await AdminModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }
    const HashedPassword = bcrypt.hashSync(password, 10);
    const CreateUser = await AdminModel.create({
      name,
      email,
      password: HashedPassword,
    });
    res.json({ user: CreateUser });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Error in creating user" });
  }
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminModel.findOne({ email });
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
export { AdminLogin , AdminRegister  }