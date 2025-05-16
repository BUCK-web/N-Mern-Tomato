import { useState } from 'react'

import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPop from './components/Login/LoginPop'
import Verify from './pages/Verify/verify'
import Myorder from './pages/MyOrders/Myorder'


function App() {
  const  [ShowLogin, setShowLogin] = useState(false)
  return (
    <>
    {ShowLogin ? <LoginPop setShowLogin={setShowLogin}/> : <></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin}/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
            <Route exact path="/order" element={<PlaceOrder/>}/>
            <Route exact path="/verify" element={<Verify/>}/>
            <Route exact path="/myorders" element={<Myorder/>}/>
          </Routes>
        </div>
          <Footer/>
    </>
  )
}

export default App
