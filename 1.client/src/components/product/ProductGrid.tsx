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
    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card bg-white p-6 rounded-lg shadow-lg"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-gray-800 mt-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Add to cart*/}
          {!isAdmin && (
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white px-4 py-2 rounded-md w-full mt-4"
            >
              Add to Cart
            </button>
          )}

          {/* Admin */}
          {isAdmin && (
            <div className="admin-controls mt-4">
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handlePriceChange(product.id, parseFloat(e.target.value))
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="file"
                onChange={(e) => handleImageChange(product.id, e)}
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md w-full"
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
