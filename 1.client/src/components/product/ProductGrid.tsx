import React, { useContext } from "react";
import { ProductType } from "../../types";
import { CartContext } from "../../App";
import "./ProductGrid.css";
import "./productcard.css";

interface ProductGridProps {
  products: ProductType[];
  handleDeleteProduct: (id: number) => void;
  handleImageChange: (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handlePriceChange: (id: number, newPrice: number) => void;
  isAdmin: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  handleDeleteProduct,
  handleImageChange,
  handlePriceChange,
  isAdmin,
}) => {
  const { addToCart } = useContext(CartContext);

  if (!products || products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img
              src={product.img_url}
              alt={product.product_name}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <h3 className="product-title">{product.product_name}</h3>
            <p className="product-description">{product.product_details}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>

          {/* Add to cart*/}
          {!isAdmin && (
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          )}

          {/* Admin */}
          {isAdmin && (
            <div className="mt-4">
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handlePriceChange(product.id, parseFloat(e.target.value))
                }
                className="admin-input"
              />
              <input
                type="file"
                onChange={(e) => handleImageChange(product.id, e)}
                className="admin-input-file"
              />
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="delete-button"
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

//Mahmoud
