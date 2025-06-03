import React, { createContext, useState } from "react";
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
import { CartItem } from "./types";
import "./App.css";

import { ProductType } from "./types";

// Cart context for managing cart state across components

interface CartContextType {
  cartItems: CartItem[];

  //Mahmoud:
  addToCart: (product: ProductType) => void;
  //Mahmoud

  //Peter"

  // addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  //Peter
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

// Placeholder components for pages that might not exist yet
const ProductList = () => (
  <div className="page-container">Product List Page</div>
);
const Cart = () => <div className="page-container">Cart Page</div>;

const App: React.FC = () => {
  // Cart state management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductType, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { productId: product.id, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/women" element={<Women />} />
              <Route path="/men" element={<Men />} />
              <Route path="/kids" element={<Kids />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
