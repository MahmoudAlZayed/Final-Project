import React, { useState, useEffect, useContext } from "react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Women.css";
import { CartContext } from "../../App";
import { jwtDecode } from "jwt-decode";

const Women: React.FC = () => {
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

    /* Fetch women's products */
    fetchWomenProducts();
  }, []);

  const fetchWomenProducts = async () => {
    setIsLoading(true);
    // In a real app, this would be an API call
    // For now, we'll use sample data
    const womenProducts: Product[] = [
      {
        id: 101,
        name: "Women's Casual Dress",
        price: 59.99,
        description: "Comfortable casual dress for everyday wear",
        category: "Women",
        imageUrl: "/images/womens-dress.jpg",
        inStock: true,
      },
      {
        id: 102,
        name: "Women's Blouse",
        price: 39.99,
        description: "Elegant blouse for formal occasions",
        category: "Women",
        imageUrl: "/images/womens-blouse.jpg",
        inStock: true,
      },
      {
        id: 103,
        name: "Women's Jeans",
        price: 49.99,
        description: "Classic fit jeans with stretch comfort",
        category: "Women",
        imageUrl: "/images/womens-jeans.jpg",
        inStock: true,
      },
      {
        id: 104,
        name: "Women's Sweater",
        price: 45.99,
        description: "Warm knit sweater for colder days",
        category: "Women",
        imageUrl: "/images/womens-sweater.jpg",
        inStock: false,
      },
      {
        id: 105,
        name: "Women's T-Shirt",
        price: 24.99,
        description: "Soft cotton t-shirt with modern design",
        category: "Women",
        imageUrl: "/images/womens-tshirt.jpg",
        inStock: true,
      },
      {
        id: 106,
        name: "Women's Skirt",
        price: 34.99,
        description: "Stylish skirt for any occasion",
        category: "Women",
        imageUrl: "/images/womens-skirt.jpg",
        inStock: true,
      },
    ];

    setProducts(womenProducts);
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
          <h1 className="category-title">WOMEN'S COLLECTION</h1>
          <p className="category-description">
            Discover our latest women's fashion with stylish and comfortable
            designs.
          </p>
        </div>
      </section>

      <section className="category-filters">
        <div className="filter-container">
          <h2 className="filter-title">Filter By</h2>
          <div className="filter-options">
            <button className="filter-button active">All</button>
            <button className="filter-button">Dresses</button>
            <button className="filter-button">Tops</button>
            <button className="filter-button">Bottoms</button>
            <button className="filter-button">Outerwear</button>
          </div>
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">WOMEN'S CLOTHING</h2>
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

export default Women;
