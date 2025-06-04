import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import ProductDetail from "./components/pages/ProductDetail";
import Login from "./components/pages/Login";
import AdminLogin from "./components/pages/AdminLogin";
import Women from "./components/pages/Women";
import Men from "./components/pages/Men";
import Kids from "./components/pages/Kids";
import Footwear from "./components/pages/FootWear";
import Accessories from "./components/pages/Accessories";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import OrderConfirmation from "./components/pages/OrderConfirmation";
import { CartProvider } from "./context/CartContext";
import "./App.css";

// Placeholder component for pages that might not exist yet
const ProductList = () => (
  <div className="page-container">Product List Page</div>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/women" element={<Women />} />
              <Route path="/men" element={<Men />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/footwear" element={<Footwear />} />
              <Route path="/accessories" element={<Accessories />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
