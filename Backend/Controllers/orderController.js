import OrderModel from "../models/OrderModels.js";
import UserModel from "../models/UsersModle.js";
import Stripe from "stripe";

const Stripes = new Stripe(process.env.Stripe_Secret_key);

// Placing user order From Frontend

const placeOrder = async (req, res) => {
    const FrontEnd_URL = "https://mern-tomato.onrender.com";
    try {
        const newOrder = await OrderModel.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 ,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Total",
                },
                unit_amount: 12 * 100 ,
            },
            quantity: 1
        });

        const session = await Stripes.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${FrontEnd_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${FrontEnd_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_URL: session.url });
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ success: false, message: error.message  });
    }
};


const verifyOrder = async (req,res)=>{
    const {orderId,scucees} = req.body;
    try {
        if (scucees === "true") {
            await OrderModel.findByIdAndUpdate(orderId,{payment : true})
            res.json({ scucees: true, message: "Payment Successful" });
        }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({ scucees: false, message: "Payment Failed" });
    
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ scucees: false, message: error.message  });
    }
}


const getOrders = async (req, res) => {
    try {
        const data = await OrderModel.find({userId: req.body.userId})
        res.json({ data: data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Error in fetching orders" });
    }
    
}

const getAdminOrder = async (req, res) => {
    try {
        const data = await OrderModel.find({})
        res.json({ data: data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Error in fetching orders" });
    }
}


export { placeOrder,verifyOrder,getOrders,getAdminOrder };
