import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";
import "./Home.css";
import { Product } from "../../types";

const Home: React.FC = () => {
  // Sample products data - this would normally come from an API
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Smartphone X",
      price: 699.99,
      description: "Latest smartphone with advanced features",
      category: "Electronics",
      imageUrl: "/images/smartphone.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 149.99,
      description: "Premium wireless headphones with noise cancellation",
      category: "Electronics",
      imageUrl: "/images/headphones.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 249.99,
      description: "Fitness tracker and smartwatch with health monitoring",
      category: "Electronics",
      imageUrl: "/images/smartwatch.jpg",
      inStock: false,
    },
  ];

  const newArrivals: Product[] = [
    {
      id: 4,
      name: "Cotton T-Shirt",
      price: 24.99,
      description: "Comfortable cotton t-shirt in various colors",
      category: "Clothing",
      imageUrl: "/images/tshirt.jpg",
      inStock: true,
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 39.99,
      description: "Modern desk lamp with adjustable brightness",
      category: "Home & Garden",
      imageUrl: "/images/lamp.jpg",
      inStock: true,
    },
    {
      id: 6,
      name: "Face Cream",
      price: 29.99,
      description: "Hydrating face cream for all skin types",
      category: "Beauty",
      imageUrl: "/images/facecream.jpg",
      inStock: true,
    },
  ];

  // In a real application, you would fetch products from an API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       // const data = await fetchFeaturedProducts();
  //       // setFeaturedProducts(data);
  //       // const newArrivalsData = await fetchNewArrivals();
  //       // setNewArrivals(newArrivalsData);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Summer Collection 2025</h1>
          <p className="hero-description">
            Discover our latest products with amazing deals and discounts.
            Limited time offers available.
          </p>
          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="categories-grid">
          {["Electronics", "Clothing", "Home & Garden", "Beauty"].map(
            (category) => (
              <div key={category} className="category-card">
                <div className="category-icon">{category.charAt(0)}</div>
                <h3 className="category-title">{category}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <h2 className="section-title">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <h2 className="section-title">New Arrivals</h2>
        <ProductGrid products={newArrivals} />
      </section>
    </div>
  );
};

export default Home;
