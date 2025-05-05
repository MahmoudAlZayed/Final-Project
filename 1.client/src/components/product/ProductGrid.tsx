import React, { useContext } from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import { CartContext } from "../../App";
import "./ProductGrid.css";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  // Get addToCart function from cart context
  const { addToCart } = useContext(CartContext);

  if (!products || products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={addToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
