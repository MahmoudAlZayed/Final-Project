import React, { useState, useEffect, useContext } from "react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Men.css";
import { CartContext } from "../../App";
import { jwtDecode } from "jwt-decode";

const Men: React.FC = () => {
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

    /* Fetch men's products */
    fetchMenProducts();
  }, []);

  const fetchMenProducts = async () => {
    setIsLoading(true);

    /* In a real app, this would be an API call */

    /* For now, we'll use sample data */

    const menProducts: Product[] = [
      {
        id: 201,
        name: "Men's Casual Shirt",
        price: 49.99,
        description: "Comfortable button-up shirt for casual wear",
        category: "Men",
        imageUrl: "/images/mens-shirt.jpg",
        inStock: true,
      },
      {
        id: 202,
        name: "Men's Jeans",
        price: 59.99,
        description: "Classic straight fit jeans for everyday wear",
        category: "Men",
        imageUrl: "/images/mens-jeans.jpg",
        inStock: true,
      },
      {
        id: 203,
        name: "Men's Polo Shirt",
        price: 34.99,
        description: "Classic polo shirt with breathable fabric",
        category: "Men",
        imageUrl: "/images/mens-polo.jpg",
        inStock: true,
      },
      {
        id: 204,
        name: "Men's Sweater",
        price: 54.99,
        description: "Warm knit sweater for colder days",
        category: "Men",
        imageUrl: "/images/mens-sweater.jpg",
        inStock: false,
      },
      {
        id: 205,
        name: "Men's T-Shirt",
        price: 24.99,
        description: "Soft cotton t-shirt with modern design",
        category: "Men",
        imageUrl: "/images/mens-tshirt.jpg",
        inStock: true,
      },
      {
        id: 206,
        name: "Men's Jacket",
        price: 89.99,
        description: "Stylish jacket for cooler weather",
        category: "Men",
        imageUrl: "/images/mens-jacket.jpg",
        inStock: true,
      },
    ];

    setProducts(menProducts);
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
