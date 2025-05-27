import React, { useState, useEffect, useContext } from "react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Kids.css";
import { CartContext } from "../../App";
import { jwtDecode } from "jwt-decode";

const Kids: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

    /* In a real app, this would be an API call */

    /* For now, we'll use sample data */

    const kidsProducts: Product[] = [
      {
        id: 301,
        name: "Kids' T-Shirt",
        price: 19.99,
        description: "Soft cotton t-shirt with fun design",
        category: "Kids",
        imageUrl: "/images/kids-tshirt.jpg",
        inStock: true,
      },
      {
        id: 302,
        name: "Kids' Jeans",
        price: 29.99,
        description: "Durable jeans with adjustable waist",
        category: "Kids",
        imageUrl: "/images/kids-jeans.jpg",
        inStock: true,
      },
      {
        id: 303,
        name: "Kids' Dress",
        price: 34.99,
        description: "Cute dress for special occasions",
        category: "Kids",
        imageUrl: "/images/kids-dress.jpg",
        inStock: true,
      },
      {
        id: 304,
        name: "Kids' Sweater",
        price: 24.99,
        description: "Warm knit sweater for colder days",
        category: "Kids",
        imageUrl: "/images/kids-sweater.jpg",
        inStock: false,
      },
      {
        id: 305,
        name: "Kids' Pajamas",
        price: 22.99,
        description: "Comfortable pajamas for a good night's sleep",
        category: "Kids",
        imageUrl: "/images/kids-pajamas.jpg",
        inStock: true,
      },
      {
        id: 306,
        name: "Kids' Jacket",
        price: 39.99,
        description: "Lightweight jacket for cooler weather",
        category: "Kids",
        imageUrl: "/images/kids-jacket.jpg",
        inStock: true,
      },
    ];

    setProducts(kidsProducts);
    setIsLoading(false);
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
