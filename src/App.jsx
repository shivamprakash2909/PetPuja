import React, { useState } from "react";
import Navbar from "./component/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/placeOrder/placeOrder";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import Footer from "./component/Footer/Footer";
import LoginPopup from "./component/LoginPopup/LoginPopup";
import Cart from "./pages/Cart/Cart";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const location = useLocation();
  const validPaths = ["/", "/cart", "/order"];
  const shouldHideUI = !validPaths.includes(location.pathname);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        {!shouldHideUI && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {!shouldHideUI && <Footer />}
      </div>
    </>
  );
};

export default App;
