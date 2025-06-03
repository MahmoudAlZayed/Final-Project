import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartSummary.css";

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Order Summary</h2>

      <div className="summary-items">
        <span className="summary-item-count">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="summary-line">
        <span className="summary-label">Subtotal</span>
        <span className="summary-value">${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-line">
        <span className="summary-label">Shipping</span>
        <span className="summary-value">${shipping.toFixed(2)}</span>
      </div>

      <div className="summary-line">
        <span className="summary-label">Tax</span>
        <span className="summary-value">${tax.toFixed(2)}</span>
      </div>

      <div className="summary-total">
        <span className="total-label">Total</span>
        <span className="total-value">${total.toFixed(2)}</span>
      </div>

      <div className="summary-actions">
        <button
          className="checkout-button"
          onClick={onCheckout}
          disabled={totalItems === 0}
        >
          Proceed to Checkout
        </button>

        <button
          className="continue-shopping-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
