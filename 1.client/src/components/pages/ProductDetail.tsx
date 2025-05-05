import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import Button from "../ui/Button";
import { CartContext } from "../../App";
import "./ProductDetail.css";

// Temporary mock function until API service is implemented
const fetchProductById = async (id: number): Promise<Product> => {
  return {
    id,
    name: "Sample Product",
    price: 99.99,
    description: "This is a sample product description. In a real app, this would be fetched from an API.",
    category: "Electronics",
    imageUrl: "/images/product.jpg",
    inStock: true
  };
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(Number(id));
        setProduct(productData);
      } catch (err) {
        setError("Failed to load product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">Loading product details...</div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">{error || "Product not found"}</div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-grid">
          <div className="product-detail-image-container">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-detail-image"
              />
            ) : (
              <div className="product-detail-image-placeholder">
                Product Image
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-price">
              ${product.price.toFixed(2)}
            </div>

            <div className="product-detail-description">
              {product.description}
            </div>

            <div className="product-detail-actions">
              <div className="product-detail-quantity">
                <label htmlFor="quantity" className="quantity-label">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="quantity-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleAddToCart}
                className="product-detail-add-button"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            <div className="product-detail-meta">
              <div className="product-detail-category">
                <span className="meta-label">Category:</span> {product.category}
              </div>
              <div className="product-detail-stock">
                <span className="meta-label">Availability:</span>
                <span className={product.inStock ? "in-stock" : "out-of-stock"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
