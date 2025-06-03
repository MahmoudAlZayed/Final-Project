import React from "react";
import { CartItem as CartItemType } from "../../context/CartContext";
import "./CartItem.css";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={item.img_url || "/placeholder-image.jpg"}
          alt={item.product_name}
          className="cart-product-image"
        />
      </div>

      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.product_name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-selector">
          <label htmlFor={`quantity-${item.id}`} className="quantity-label">
            Qty:
          </label>
          <select
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={handleQuantityChange}
            className="quantity-select"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleRemove}
          className="remove-button"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-amount">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
