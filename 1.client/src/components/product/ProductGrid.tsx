import React from "react";
import { ProductType } from "../../types";
import { useCart } from "../../context/CartContext";
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
  const { addItem } = useCart();

  if (!products || products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  const getProductImage = (product: ProductType): string => {
    const categoryMap: Record<number, string> = {
      1: "clothes",
      2: "clothes",
      3: "clothes",
      4: "accessories",
      5: "footwear",
    };

    const subcategoryMap: Record<number, string> = {
      1: "tops",
      2: "bottom",
      3: "underware",
      4: "glasses",
      5: "jewlery",
      6: "bags",
      7: "sneakers",
      8: "pumps",
      9: "boots",
      10: "skirt",
    };

    const categoryFolder = categoryMap[product.category_id] || "clothes";
    const subcategoryFile = subcategoryMap[product.subcategory_id] || "default";

    let genderSuffix = "";
    if (product.category_id === 2) genderSuffix = "_women";
    else if (product.category_id === 1) genderSuffix = "_men";
    else if (product.category_id === 3) genderSuffix = "_kids";

    const withSuffix = `/assets/products_img/${categoryFolder}/${subcategoryFile}${genderSuffix}.png`;
    const withoutSuffix = `/assets/products_img/${categoryFolder}/${subcategoryFile}.png`;

    return withSuffix;
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img
              src={getProductImage(product)}
              alt={product.product_name}
              className="product-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/products_img/default.png";
              }}
            />
          </div>
          <div className="product-info">
            <h3 className="product-title">{product.product_name}</h3>
            <p className="product-description">{product.product_details}</p>
            <p className="product-price">${Number(product.price).toFixed(2)}</p>
          </div>

          {/* Add to cart*/}
          {!isAdmin && (
            <button
              onClick={() => addItem(product)}
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
