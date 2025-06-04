import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`; // Generate random order number

  return (
    <div className="order-confirmation-page">
      <div className="order-confirmation-container">
        <div className="confirmation-content">
          <div className="confirmation-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="check-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="confirmation-title">Order Confirmed!</h1>

          <p className="confirmation-message">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          <div className="order-details">
            <div className="order-detail-item">
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">{orderNumber}</span>
            </div>

            <div className="order-detail-item">
              <span className="detail-label">Order Date:</span>
              <span className="detail-value">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <div className="order-detail-item">
              <span className="detail-label">Estimated Delivery:</span>
              <span className="detail-value">
                {new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="confirmation-message-additional">
            <p>A confirmation email has been sent to your email address.</p>
            <p>You can track your order status in your account.</p>
          </div>

          <div className="confirmation-actions">
            <button
              className="continue-shopping-button"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <button
              className="view-orders-button"
              onClick={() => navigate("/account/orders")}
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
