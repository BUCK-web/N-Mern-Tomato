import mongoose from "mongoose";

const Connection = async () => {
  await mongoose.connect("mongodb+srv://Shokatshahin:Shokat1234..@cluster0.2bws3.mongodb.net/tomatoDb").then(console.log("Connected established to MongoDB"));
};

export default Connection;      