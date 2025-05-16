import React,{useState,useContext,useEffect} from "react";
import "./Myorder.css";
import OrderCards from "../../components/OrderCard/OrderCards";
import axios from 'axios'
import { StoreContext } from '../../context/storeContex'


const Myorder = () => {

    const {token} = useContext(StoreContext)
    const [Orders , setOrders ] = useState([])
    const FetchOrderData = async()=>{
        try {
            const OrderData = await axios.get("http://localhost:5000/api/payment/getorder",{headers:{token}})
            setOrders(OrderData.data.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        if (token) {
            FetchOrderData();
        }
    }, [token])                    

  return (
    <>
      <div>
        <h1 className="heads">My Order</h1>
        <div className="my-order-ctn">
            {
                Orders.map((order, index) => (
                    <OrderCards key={index} items={order.items} amount={order.amount} status={order.status} />
                ))
            }
        </div>
      </div>
    </>
  );
};

export default Myorder;
