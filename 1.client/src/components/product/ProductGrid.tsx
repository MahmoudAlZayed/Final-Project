//Peter:

// import React, { useContext } from "react";
// import { Product } from "../../types";
// import ProductCard from "./ProductCard";
// import { CartContext } from "../../App";
// import "./ProductGrid.css";

// interface ProductGridProps {
//   products: Product[];
// }

// const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
//   // Get addToCart function from cart context
//   const { addToCart } = useContext(CartContext);

//   if (!products || products.length === 0) {
//     return <div className="no-products">No products found</div>;
//   }

//   return (
//     <div className="product-grid">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           onAddToCart={addToCart}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;

//Peter

//Mahmoud :

import React, { useContext } from "react";
import { Product } from "../../types";
import { CartContext } from "../../App";
import "./ProductGrid.css";
import "./productcard.css";

interface ProductGridProps {
  products: Product[];
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
        <div
          key={product.id}
          className="product-card"
        >
          <div className="product-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
          </div>
          <div className="product-info">
          <h3 className="product-title">
            {product.name}
          </h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            ${product.price.toFixed(2)}
          </p>
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
