import mongoose from "mongoose";

const AdminMongoose = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminModel =
  mongoose.model.Admin || mongoose.model("Admin", AdminMongoose);
export default AdminModel;
