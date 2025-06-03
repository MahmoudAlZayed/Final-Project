import React, { useState, useEffect } from "react";
import { ProductType } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Men.css";
import { jwtDecode } from "jwt-decode";
import { fetchProductTypes } from "../../services/productTypeService";

const Men: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    /* Check if user is admin */
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.role === "admin") {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error("Invalid token", e);
      }
    }

    /* Fetch men's products */
    fetchMenProducts();
  }, []);

  const fetchMenProducts = async () => {
    setIsLoading(true);
    try {
      /*----- Fetch all products from the service -----*/
      const allProducts = await fetchProductTypes();

      /*----- Filter for men's products (category_id: 1) -----*/
      const menProducts = allProducts.filter(
        (product: ProductType) => product.category_id === 1
      );

      setProducts(menProducts);
    } catch (error) {
      console.error("Error fetching men's products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleImageChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedImage = event.target.files?.[0];
    if (updatedImage) {
      const imageUrl = URL.createObjectURL(updatedImage);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, imageUrl } : p))
      );
    }
  };

  const handlePriceChange = (id: number, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  return (
    <div className="category-page">
      <section className="category-hero">
        <div className="category-hero-container">
          <h1 className="category-title">MEN'S COLLECTION</h1>
          <p className="category-description">
            Explore our latest men's fashion with comfortable and stylish
            designs.
          </p>
        </div>
      </section>

      <section className="category-filters">
        <div className="filter-container">
          <h2 className="filter-title">Filter By</h2>
          <div className="filter-options">
            <button className="filter-button active">All</button>
            <button className="filter-button">Shirts</button>
            <button className="filter-button">Pants</button>
            <button className="filter-button">T-Shirts</button>
            <button className="filter-button">Outerwear</button>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">MEN'S CLOTHING</h2>
        {isLoading ? (
          <p className="loading-indicator">Loading products...</p>
        ) : (
          <ProductGrid
            products={products}
            handleDeleteProduct={handleDeleteProduct}
            handleImageChange={handleImageChange}
            handlePriceChange={handlePriceChange}
            isAdmin={isAdmin}
          />
        )}
      </section>
    </div>
  );
};

export default Men;
