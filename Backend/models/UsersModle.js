import mongoose from "mongoose";

// Define User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
},{minimize:false});

// Define User model
const UserModel = mongoose.model.User || mongoose.model("User", UserSchema);

export default UserModel;
