import UserModel from "../models/UsersModle.js";

// Add Items to User Cart

const addToCart = async (req,res)=>{
    try {
        const UserData = await UserModel.findOne({_id : req.body.userId})        
        let cartData = await UserData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message: "Item added to cart"})
    } catch (error) {
        res.status(500).json({success: false, message: "Error in adding item to cart"})
    }
}


const removeFromCart = async (req, res) => {
    try {
        const UserData = await UserModel.findOne({_id : req.body.userId})
        let cartData = await UserData.cartData
        if (cartData[req.body.itemId]> 0) {
            cartData[req.body.itemId] -= 1  
        } 
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message: "Item Dleted From cart"})
    } catch (error) {

        res.status(500).json({success: false, message: "Error in deleting item from cart"})
    }   
}

// Fetch User Cart

const getCart = async (req,res)=>{
    try {
        const userData = await UserModel.findOne({_id : req.body.userId})
        const cartData = await userData.cartData 
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error in fetching cart"})
    }
}
export {addToCart, removeFromCart, getCart}
