import React, { useState, useEffect } from "react";
import { ProductType } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Kids.css";
import { jwtDecode } from "jwt-decode";
import { fetchProductTypes } from "../../services/productTypeService";

const Kids: React.FC = () => {
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

    /* Fetch kids' products */
    fetchKidsProducts();
  }, []);

  const fetchKidsProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch all products from the service
      const allProducts = await fetchProductTypes();
      
      // Filter for kids' products (category_id: 3)
      const kidsProducts = allProducts.filter((product: ProductType) => product.category_id === 3);
      
      setProducts(kidsProducts);
    } catch (error) {
      console.error("Error fetching kids' products:", error);
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
          <h1 className="category-title">KIDS' COLLECTION</h1>
          <p className="category-description">
            Discover our latest kids' fashion with fun, comfortable designs for
            all ages.
          </p>
        </div>
      </section>

      <section className="category-filters">
        <div className="filter-container">
          <h2 className="filter-title">Filter By</h2>
          <div className="filter-options">
            <button className="filter-button active">All</button>
            <button className="filter-button">Tops</button>
            <button className="filter-button">Bottoms</button>
            <button className="filter-button">Dresses</button>
            <button className="filter-button">Outerwear</button>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">KIDS' CLOTHING</h2>
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

export default Kids;
