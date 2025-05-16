import React, { useEffect, useState } from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Verify = () => {
    const [SearchParams , setSearchParams ] = useSearchParams()
    const scucees = SearchParams.get("success")
    const navigate = useNavigate()
    const orderId = SearchParams.get("orderId")
    const url = 'http://localhost:5000'
    const verifyPayment = async()=>{
        const res = await axios.post("http://localhost:5000/api/payment/verify",{scucees,orderId})
        console.log(res.data.scucees);
        if (res.data.scucees) {
            setTimeout(() => {
                navigate("/myorders")
            }, 5000);
        }else{
            setTimeout(() => {
                navigate("/")
            }, 5000);
        }
    }
    useEffect(() => {
      verifyPayment()
    }, [])
    

  return (
    <>
        <div className="verify">
            <div className="spinner"></div>
        </div>
    </>
  )
}

export default Verify