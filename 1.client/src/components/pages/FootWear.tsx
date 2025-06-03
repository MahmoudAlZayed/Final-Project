import React, { useState, useEffect } from "react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Footwear.css";
import { jwtDecode } from "jwt-decode";

const Footwear: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Filter states
  const [activeGender, setActiveGender] = useState<string>("all");
  const [activeSize, setActiveSize] = useState<string>("all");
  const [activeColor, setActiveColor] = useState<string>("all");

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

    /*----- Fetch footwear products -----*/

    fetchFootwearProducts();
  }, []);

  /*----- Apply filters whenever they change -----*/
  useEffect(() => {
    applyFilters();
  }, [activeGender, activeSize, activeColor, products]);

  const fetchFootwearProducts = async () => {
    setIsLoading(true);
    /*----- In a real app, this would be an API call -----*/
    /*----- For now, we'll use sample data -----*/
    const footwearProducts: Product[] = [
      {
        id: 201,
        name: "Men's Running Shoes",
        price: 89.99,
        description: "Comfortable running shoes with cushioned soles",
        category: "Footwear",
        gender: "Men",
        size: "42",
        color: "Black",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 202,
        name: "Women's Casual Sneakers",
        price: 69.99,
        description: "Stylish casual sneakers for everyday wear",
        category: "Footwear",
        gender: "Women",
        size: "38",
        color: "White",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 203,
        name: "Kids' Sport Shoes",
        price: 49.99,
        description: "Durable sport shoes for active kids",
        category: "Footwear",
        gender: "Kids",
        size: "34",
        color: "Blue",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 204,
        name: "Men's Leather Boots",
        price: 129.99,
        description: "Classic leather boots for all occasions",
        category: "Footwear",
        gender: "Men",
        size: "43",
        color: "Brown",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 205,
        name: "Women's High Heels",
        price: 99.99,
        description: "Elegant high heels for formal events",
        category: "Footwear",
        gender: "Women",
        size: "39",
        color: "Red",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 206,
        name: "Kids' Light-up Sneakers",
        price: 59.99,
        description: "Fun sneakers with light-up soles",
        category: "Footwear",
        gender: "Kids",
        size: "32",
        color: "Multi",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 207,
        name: "Men's Casual Loafers",
        price: 79.99,
        description: "Comfortable loafers for casual occasions",
        category: "Footwear",
        gender: "Men",
        size: "44",
        color: "Navy",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 208,
        name: "Women's Running Shoes",
        price: 89.99,
        description: "Performance running shoes with breathable mesh",
        category: "Footwear",
        gender: "Women",
        size: "37",
        color: "Pink",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 209,
        name: "Kids' Sandals",
        price: 39.99,
        description: "Comfortable sandals for summer days",
        category: "Footwear",
        gender: "Kids",
        size: "30",
        color: "Green",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 210,
        name: "Men's Hiking Boots",
        price: 119.99,
        description: "Durable hiking boots for outdoor adventures",
        category: "Footwear",
        gender: "Men",
        size: "45",
        color: "Grey",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 211,
        name: "Women's Winter Boots",
        price: 109.99,
        description: "Insulated winter boots with waterproof exterior",
        category: "Footwear",
        gender: "Women",
        size: "38",
        color: "Black",
        imageUrl: "",
        inStock: true,
      },
      {
        id: 212,
        name: "Kids' Rain Boots",
        price: 44.99,
        description: "Colorful waterproof boots for rainy days",
        category: "Footwear",
        gender: "Kids",
        size: "33",
        color: "Yellow",
        imageUrl: "",
        inStock: true,
      },
    ];

    setProducts(footwearProducts);
    setFilteredProducts(footwearProducts);
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    /*----- Apply gender filter -----*/
    if (activeGender !== "all") {
      filtered = filtered.filter((product) => product.gender === activeGender);
    }

    /*----- Apply size filter -----*/
    if (activeSize !== "all") {
      filtered = filtered.filter((product) => product.size === activeSize);
    }

    /*----- Apply color filter -----*/
    if (activeColor !== "all") {
      filtered = filtered.filter((product) => product.color === activeColor);
    }

    setFilteredProducts(filtered);
  };

  const handleGenderFilter = (gender: string) => {
    setActiveGender(gender);
  };

  const handleSizeFilter = (size: string) => {
    setActiveSize(size);
  };

  const handleColorFilter = (color: string) => {
    setActiveColor(color);
  };

  /*----- Handler functions for ProductGrid props -----*/
  const handleDeleteProduct = (id: number) => {
    /*----- In a real app, this would call an API to delete the product -----*/
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleImageChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    /*----- In a real app, this would upload the image to a server -----*/
    if (event.target.files && event.target.files[0]) {
      const updatedImage = event.target.files[0];
      const imageUrl = URL.createObjectURL(updatedImage);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, imageUrl } : p))
      );
    }
  };

  const handlePriceChange = (id: number, newPrice: number) => {
    /*----- In a real app, this would call an API to update the price -----*/
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  return (
    <div className="category-page">
      {/* Hero section */}
      <div className="category-hero">
        <div className="category-hero-container">
          <h1 className="category-title">Footwear Collection</h1>
          <p className="category-description">
            Discover our latest collection of shoes for men, women, and kids.
            From casual sneakers to formal footwear, we have something for every
            occasion.
          </p>
        </div>
      </div>

      {/* Filters section */}
      <div className="category-filters">
        <div className="filter-container">
          {/* Gender filter */}
          <div className="mb-6">
            <h3 className="filter-title">Gender</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activeGender === "all" ? "active" : ""
                }`}
                onClick={() => handleGenderFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-button ${
                  activeGender === "Men" ? "active" : ""
                }`}
                onClick={() => handleGenderFilter("Men")}
              >
                Men
              </button>
              <button
                className={`filter-button ${
                  activeGender === "Women" ? "active" : ""
                }`}
                onClick={() => handleGenderFilter("Women")}
              >
                Women
              </button>
              <button
                className={`filter-button ${
                  activeGender === "Kids" ? "active" : ""
                }`}
                onClick={() => handleGenderFilter("Kids")}
              >
                Kids
              </button>
            </div>
          </div>

          {/* Size filter */}
          <div className="mb-6">
            <h3 className="filter-title">Size</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activeSize === "all" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("all")}
              >
                All Sizes
              </button>
              {/* Men's sizes */}
              <button
                className={`filter-button ${
                  activeSize === "42" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("42")}
              >
                42
              </button>
              <button
                className={`filter-button ${
                  activeSize === "43" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("43")}
              >
                43
              </button>
              <button
                className={`filter-button ${
                  activeSize === "44" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("44")}
              >
                44
              </button>
              <button
                className={`filter-button ${
                  activeSize === "45" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("45")}
              >
                45
              </button>
              {/* Women's sizes */}
              <button
                className={`filter-button ${
                  activeSize === "37" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("37")}
              >
                37
              </button>
              <button
                className={`filter-button ${
                  activeSize === "38" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("38")}
              >
                38
              </button>
              <button
                className={`filter-button ${
                  activeSize === "39" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("39")}
              >
                39
              </button>
              {/* Kids' sizes */}
              <button
                className={`filter-button ${
                  activeSize === "30" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("30")}
              >
                30
              </button>
              <button
                className={`filter-button ${
                  activeSize === "32" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("32")}
              >
                32
              </button>
              <button
                className={`filter-button ${
                  activeSize === "34" ? "active" : ""
                }`}
                onClick={() => handleSizeFilter("34")}
              >
                34
              </button>
            </div>
          </div>

          {/* Color filter */}
          <div className="mb-6">
            <h3 className="filter-title">Color</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activeColor === "all" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("all")}
              >
                All Colors
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Black" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Black")}
              >
                Black
              </button>
              <button
                className={`filter-button ${
                  activeColor === "White" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("White")}
              >
                White
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Brown" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Brown")}
              >
                Brown
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Blue" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Blue")}
              >
                Blue
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Red" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Red")}
              >
                Red
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Pink" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Pink")}
              >
                Pink
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Green" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Green")}
              >
                Green
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Grey" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Grey")}
              >
                Grey
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Navy" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Navy")}
              >
                Navy
              </button>
              <button
                className={`filter-button ${
                  activeColor === "Multi" ? "active" : ""
                }`}
                onClick={() => handleColorFilter("Multi")}
              >
                Multi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products section */}
      <div className="products-section">
        <h2 className="section-title">Footwear Collection</h2>
        {isLoading ? (
          <div className="loading-indicator">Loading products...</div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            handleDeleteProduct={handleDeleteProduct}
            handleImageChange={handleImageChange}
            handlePriceChange={handlePriceChange}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default Footwear;
