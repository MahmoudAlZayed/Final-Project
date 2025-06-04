import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*----- Calculate order totals -----*/
  const shipping = cart.totalItems > 0 ? 5.99 : 0;
  const tax = cart.totalPrice * 0.1; // 10% tax
  const total = cart.totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    /*----- Simulate order processing -----*/
    setTimeout(() => {
      /*----- Clear the cart after successful checkout -----*/
      clearCart();
      /*----- Navigate to order confirmation -----*/
      navigate("/order-confirmation");
    }, 1500);
  };

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <h1>Your cart is empty</h1>
            <p>Please add some items to your cart before checking out.</p>
            <button className="return-to-shop" onClick={() => navigate("/")}>
              Return to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2 className="section-title">Shipping Information</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">Payment Information</h2>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      required
                      placeholder="MM/YY"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      required
                      placeholder="123"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <h2 className="section-title">Order Summary</h2>

                <div className="summary-items">
                  {cart.items.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span className="item-name">
                        {item.product_name} x {item.quantity}
                      </span>
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="summary-line">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="summary-line">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="summary-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="checkout-actions">
                <button
                  type="submit"
                  className="place-order-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>

                <button
                  type="button"
                  className="return-to-cart"
                  onClick={() => navigate("/cart")}
                  disabled={isSubmitting}
                >
                  Return to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
