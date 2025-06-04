import React, { useState, useEffect } from "react";
import { ProductType } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Footwear.css";
import { jwtDecode } from "jwt-decode";
import { fetchProductTypes } from "../../services/productTypeService";

const Footwear: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
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
    try {
      // Fetch all products from the service
      const allProducts = await fetchProductTypes();

      // Filter for footwear products (category_id: 5)
      const footwearProducts = allProducts.filter(
        (product: ProductType) => product.category_id === 5
      );

      setProducts(footwearProducts);
      setFilteredProducts(footwearProducts);
    } catch (error) {
      console.error("Error fetching footwear products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    /*----- Apply gender filter (using subcategory_id as a proxy) -----*/
    if (activeGender !== "all") {
      /*----- Map gender to subcategory_id ranges -----*/
      /*----- For example: Men: 1-3, Women: 4-6, Kids: 7-9 -----*/
      /*----- Adjust these ranges based on your actual subcategory_id assignments -----*/
      if (activeGender === "Men") {
        filtered = filtered.filter(
          (product: ProductType) =>
            product.subcategory_id >= 1 && product.subcategory_id <= 3
        );
      } else if (activeGender === "Women") {
        filtered = filtered.filter(
          (product: ProductType) =>
            product.subcategory_id >= 4 && product.subcategory_id <= 6
        );
      } else if (activeGender === "Kids") {
        filtered = filtered.filter(
          (product: ProductType) =>
            product.subcategory_id >= 7 && product.subcategory_id <= 9
        );
      }
    }

    /*----- Apply size filter (using product_details to search for size) -----*/
    if (activeSize !== "all") {
      filtered = filtered.filter(
        (product: ProductType) =>
          product.product_details
            .toLowerCase()
            .includes(`size ${activeSize}`) ||
          product.product_details.toLowerCase().includes(`size: ${activeSize}`)
      );
    }

    /*----- Apply color filter (using product_details or product_name to search for color) -----*/
    if (activeColor !== "all") {
      const colorLower = activeColor.toLowerCase();
      filtered = filtered.filter(
        (product: ProductType) =>
          product.product_details.toLowerCase().includes(colorLower) ||
          product.product_name.toLowerCase().includes(colorLower)
      );
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
      const img_url = URL.createObjectURL(updatedImage);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, img_url } : p))
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

      {/* Products grid section with proper centering and spacing */}
      <div className="products-container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="loading-indicator text-center py-8">
            Loading footwear...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products text-center py-8">
            No footwear found matching your filters.
          </div>
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
