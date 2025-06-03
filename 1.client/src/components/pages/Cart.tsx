import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../cart/CartItem";
import CartSummary from "../cart/CartSummary";
import "./Cart.css";

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  /*----- Calculate shipping, tax, and total -----*/
  const shipping = cart.totalItems > 0 ? 5.99 : 0;
  const tax = cart.totalPrice * 0.1; // 10% tax
  const total = cart.totalPrice + shipping + tax;

  const handleCheckout = () => {
    /*----- For now, just navigate to a checkout page -----*/
    /*----- In a real app, you would save the cart state and navigate -----*/
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <p className="empty-cart-message">Your cart is empty</p>
            <button className="continue-shopping" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-container">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}

              <div className="cart-actions">
                <button className="clear-cart-button" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="cart-summary-container">
              <CartSummary
                totalItems={cart.totalItems}
                subtotal={cart.totalPrice}
                shipping={shipping}
                tax={tax}
                total={total}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
