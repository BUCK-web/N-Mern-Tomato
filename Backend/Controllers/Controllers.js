import cloudinary from "../config/coludinary.js";
import FoodModel from "../models/FoodModel.js";
import fs from "fs";

// Add Fooditems

const addFood = async (req, res) => {
  try {
    // console.log(req);
    const { name, price, description, category } = req.body;
    const fileStr = req.body.image;
    const uploadResponse = await cloudinary.uploader.upload(fileStr)
    const newFood = await FoodModel.create({
      name,
      price,
      description,
      category,
      image: uploadResponse.secure_url,
    });


    res.json({data : newFood , success : true});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error in adding food" });
    
  }
};


const list = async (req, res) => {
  try {
    const Data = await FoodModel.find({});
    res.json({ data: Data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error in fetching data" });
  }
};

const DeleteFood = async (req, res) => {
  try {
    const { id } = req.body;
    const DeletedFood = await FoodModel.findById(id);
    fs.unlink(`uploads/${DeletedFood.image}`, () => {});
    await FoodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error in deleting data" });
  }
};

const CartList = async (req, res) => {
  res.json("hello world")
}

export { addFood, list, DeleteFood,CartList };
