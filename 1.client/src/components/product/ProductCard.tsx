import React from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../types";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); /*----- Prevent navigation when clicking the button -----*/
    /*----- Assume all products in the grid are in stock for now -----*/
    addItem(product);
  };
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          {product.img_url ? (
            <img
              src={product.img_url}
              alt={product.product_name}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">Product Image</div>
          )}
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-title">{product.product_name}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <Button
          onClick={handleAddToCart}
          className="product-add-button"
          variant="primary"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
