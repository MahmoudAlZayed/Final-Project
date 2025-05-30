import React, { useState, useEffect } from "react";
import { Product } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Accessories.css";
import { jwtDecode } from "jwt-decode";

const Accessories: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Filter states
  const [activeType, setActiveType] = useState<string>("all");
  const [activeMaterial, setActiveMaterial] = useState<string>("all");
  const [activePriceRange, setActivePriceRange] = useState<string>("all");

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

    /*----- Fetch accessories products -----*/
    fetchAccessoriesProducts();
  }, []);

  /*----- Apply filters whenever they change -----*/
  useEffect(() => {
    applyFilters();
  }, [activeType, activeMaterial, activePriceRange, products]);

  const fetchAccessoriesProducts = async () => {
    setIsLoading(true);
    /*----- In a real app, this would be an API call -----*/
    /*----- For now, we'll use sample data -----*/
    const accessoriesProducts: Product[] = [
      {
        id: 301,
        name: "Gold Pendant Necklace",
        price: 79.99,
        description: "Elegant gold pendant necklace with delicate chain",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "18 inch",
        color: "Gold",
      },
      {
        id: 302,
        name: "Silver Hoop Earrings",
        price: 49.99,
        description: "Classic silver hoop earrings for any occasion",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "Medium",
        color: "Silver",
      },
      {
        id: 303,
        name: "Leather Bracelet",
        price: 29.99,
        description: "Handcrafted leather bracelet with stainless steel clasp",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Men",
        size: "8 inch",
        color: "Brown",
      },
      {
        id: 304,
        name: "Pearl Stud Earrings",
        price: 59.99,
        description: "Elegant freshwater pearl stud earrings",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "Small",
        color: "White",
      },
      {
        id: 305,
        name: "Stainless Steel Watch",
        price: 129.99,
        description: "Minimalist stainless steel watch with leather strap",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Men",
        size: "42mm",
        color: "Silver",
      },
      {
        id: 306,
        name: "Beaded Anklet",
        price: 19.99,
        description: "Colorful beaded anklet for summer style",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "9 inch",
        color: "Multi",
      },
      {
        id: 307,
        name: "Silk Scarf",
        price: 39.99,
        description: "Luxurious silk scarf with geometric pattern",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "One Size",
        color: "Blue",
      },
      {
        id: 308,
        name: "Titanium Ring",
        price: 89.99,
        description: "Durable titanium ring with brushed finish",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Men",
        size: "10",
        color: "Grey",
      },
      {
        id: 309,
        name: "Crystal Hair Clip",
        price: 24.99,
        description: "Sparkling crystal hair clip for special occasions",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "Medium",
        color: "Clear",
      },
      {
        id: 310,
        name: "Leather Wallet",
        price: 49.99,
        description: "Genuine leather wallet with multiple card slots",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Men",
        size: "Standard",
        color: "Black",
      },
      {
        id: 311,
        name: "Statement Necklace",
        price: 69.99,
        description: "Bold statement necklace with colorful gemstones",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Women",
        size: "20 inch",
        color: "Multi",
      },
      {
        id: 312,
        name: "Woven Bracelet Set",
        price: 34.99,
        description: "Set of 3 woven bracelets in complementary colors",
        category: "Accessories",
        imageUrl: "",
        inStock: true,
        gender: "Unisex",
        size: "Adjustable",
        color: "Multi",
      },
    ];

    setProducts(accessoriesProducts);
    setFilteredProducts(accessoriesProducts);
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    /*----- Apply type filter (using gender field for type) -----*/
    if (activeType !== "all") {
      filtered = filtered.filter((product) => product.gender === activeType);
    }

    /*----- Apply material filter (using color field for material) -----*/
    if (activeMaterial !== "all") {
      filtered = filtered.filter((product) => product.color === activeMaterial);
    }

    /*----- Apply price range filter -----*/
    if (activePriceRange !== "all") {
      switch (activePriceRange) {
        case "under25":
          filtered = filtered.filter((product) => product.price < 25);
          break;
        case "25to50":
          filtered = filtered.filter(
            (product) => product.price >= 25 && product.price <= 50
          );
          break;
        case "50to100":
          filtered = filtered.filter(
            (product) => product.price > 50 && product.price <= 100
          );
          break;
        case "over100":
          filtered = filtered.filter((product) => product.price > 100);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const handleTypeFilter = (type: string) => {
    setActiveType(type);
  };

  const handleMaterialFilter = (material: string) => {
    setActiveMaterial(material);
  };

  const handlePriceRangeFilter = (priceRange: string) => {
    setActivePriceRange(priceRange);
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
          <h1 className="category-title">Accessories Collection</h1>
          <p className="category-description">
            Discover our latest collection of accessories to complete your look.
            From elegant jewelry to practical everyday items, find the perfect
            finishing touch for any outfit.
          </p>
        </div>
      </div>

      {/* Filters section */}
      <div className="category-filters">
        <div className="filter-container">
          {/* Type filter */}
          <div className="mb-6">
            <h3 className="filter-title">Type</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activeType === "all" ? "active" : ""
                }`}
                onClick={() => handleTypeFilter("all")}
              >
                All Types
              </button>
              <button
                className={`filter-button ${
                  activeType === "Women" ? "active" : ""
                }`}
                onClick={() => handleTypeFilter("Women")}
              >
                Women's
              </button>
              <button
                className={`filter-button ${
                  activeType === "Men" ? "active" : ""
                }`}
                onClick={() => handleTypeFilter("Men")}
              >
                Men's
              </button>
              <button
                className={`filter-button ${
                  activeType === "Unisex" ? "active" : ""
                }`}
                onClick={() => handleTypeFilter("Unisex")}
              >
                Unisex
              </button>
            </div>
          </div>

          {/* Material filter */}
          <div className="mb-6">
            <h3 className="filter-title">Material</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activeMaterial === "all" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("all")}
              >
                All Materials
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "Gold" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("Gold")}
              >
                Gold
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "Silver" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("Silver")}
              >
                Silver
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "Brown" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("Brown")}
              >
                Leather
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "White" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("White")}
              >
                Pearl
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "Multi" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("Multi")}
              >
                Mixed
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "Black" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("Black")}
              >
                Black
              </button>
            </div>
          </div>

          {/* Price Range filter */}
          <div className="mb-6">
            <h3 className="filter-title">Price Range</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activePriceRange === "all" ? "active" : ""
                }`}
                onClick={() => handlePriceRangeFilter("all")}
              >
                All Prices
              </button>
              <button
                className={`filter-button ${
                  activePriceRange === "under25" ? "active" : ""
                }`}
                onClick={() => handlePriceRangeFilter("under25")}
              >
                Under $25
              </button>
              <button
                className={`filter-button ${
                  activePriceRange === "25to50" ? "active" : ""
                }`}
                onClick={() => handlePriceRangeFilter("25to50")}
              >
                $25 - $50
              </button>
              <button
                className={`filter-button ${
                  activePriceRange === "50to100" ? "active" : ""
                }`}
                onClick={() => handlePriceRangeFilter("50to100")}
              >
                $50 - $100
              </button>
              <button
                className={`filter-button ${
                  activePriceRange === "over100" ? "active" : ""
                }`}
                onClick={() => handlePriceRangeFilter("over100")}
              >
                Over $100
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products section */}
      <div className="products-section">
        <h2 className="section-title">Accessories Collection</h2>
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

export default Accessories;
