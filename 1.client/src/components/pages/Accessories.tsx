import React, { useState, useEffect } from "react";
import { ProductType } from "../../types";
import ProductGrid from "../product/ProductGrid";
import "./Accessories.css";
import { jwtDecode } from "jwt-decode";
import { fetchProductTypes } from "../../services/productTypeService";

const Accessories: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
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

    /* Fetch accessories products */
    fetchAccessoriesProducts();
  }, []);

  /* Apply filters whenever they change */
  useEffect(() => {
    applyFilters();
  }, [activeType, activeMaterial, activePriceRange, products]);

  const fetchAccessoriesProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch all products from the service
      const allProducts = await fetchProductTypes();
      
      // Filter for accessories products (category_id: 4)
      const accessoriesProducts = allProducts.filter(
        (product: ProductType) => product.category_id === 4
      );
      
      setProducts(accessoriesProducts);
      setFilteredProducts(accessoriesProducts);
    } catch (error) {
      console.error("Error fetching accessories products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply type filter (using list_type field)
    if (activeType !== "all") {
      filtered = filtered.filter(
        (product: ProductType) => product.list_type === activeType
      );
    }

    // Apply material filter (using subcategory_id field)
    if (activeMaterial !== "all") {
      const materialId = parseInt(activeMaterial);
      filtered = filtered.filter(
        (product: ProductType) => product.subcategory_id === materialId
      );
    }

    // Apply price range filter
    if (activePriceRange !== "all") {
      switch (activePriceRange) {
        case "under25":
          filtered = filtered.filter((product: ProductType) => product.price < 25);
          break;
        case "25to50":
          filtered = filtered.filter(
            (product: ProductType) => product.price >= 25 && product.price <= 50
          );
          break;
        case "50to100":
          filtered = filtered.filter(
            (product: ProductType) => product.price > 50 && product.price <= 100
          );
          break;
        case "over100":
          filtered = filtered.filter((product: ProductType) => product.price > 100);
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

  // Handler functions for ProductGrid props
  const handleDeleteProduct = (id: number) => {
    // In a real app, this would call an API to delete the product
    setProducts((prevProducts: ProductType[]) =>
      prevProducts.filter((product: ProductType) => product.id !== id)
    );
  };

  const handleImageChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // In a real app, this would upload the image to a server
    if (event.target.files && event.target.files[0]) {
      const updatedImage = event.target.files[0];
      const img_url = URL.createObjectURL(updatedImage);
      setProducts((prev: ProductType[]) =>
        prev.map((p: ProductType) => (p.id === id ? { ...p, img_url } : p))
      );
    }
  };

  const handlePriceChange = (id: number, newPrice: number) => {
    // In a real app, this would call an API to update the price
    setProducts((prev: ProductType[]) =>
      prev.map((p: ProductType) => (p.id === id ? { ...p, price: newPrice } : p))
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
                  activeType === "featured" ? "active" : ""
                }`}
                onClick={() => handleTypeFilter("featured")}
              >
                Featured
              </button>
              <button
                className={`filter-button ${
                  activeType === "new-arrival" ? "active" : ""
                }`}
                onClick={() => handleTypeFilter("new-arrival")}
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Material filter */}
          <div className="mb-6">
            <h3 className="filter-title">Category</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  activeMaterial === "all" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("all")}
              >
                All Categories
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "1" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("1")}
              >
                Jewelry
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "2" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("2")}
              >
                Watches
              </button>
              <button
                className={`filter-button ${
                  activeMaterial === "3" ? "active" : ""
                }`}
                onClick={() => handleMaterialFilter("3")}
              >
                Bags
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

      {/* Products grid section with proper centering and spacing */}
      <div className="products-container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="loading-indicator text-center py-8">Loading accessories...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products text-center py-8">
            No accessories found matching your filters.
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            isAdmin={isAdmin}
            handleDeleteProduct={handleDeleteProduct}
            handleImageChange={handleImageChange}
            handlePriceChange={handlePriceChange}
          />
        )}
      </div>
    </div>
  );
};

export default Accessories;
