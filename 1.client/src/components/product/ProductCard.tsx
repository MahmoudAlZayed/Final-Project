import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import Button from "../ui/Button";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    onAddToCart(product.id);
  };
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          {!product.inStock && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">Product Image</div>
          )}
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <Button
          onClick={handleAddToCart}
          className="product-add-button"
          disabled={!product.inStock}
          variant={product.inStock ? "primary" : "outline"}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
