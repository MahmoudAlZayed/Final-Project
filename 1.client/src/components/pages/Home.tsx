import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";
import PictureGallery from "../layout/PictureGallery";
import "./Home.css";
import { CategoryType, ProductType } from "../../types";
import { jwtDecode } from "jwt-decode";
import OffersGallery from "../layout/OffersGallery";
import { productImages } from "../../assets/images";

// Mock
import { fetchCategory } from "../../services/categoryService";
import {
  fetchProductTypes,
  fetchCreateProductType,
  fetchDeleteProductType,
} from "../../services/productTypeService";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [newArrivals, setNewArrivals] = useState<ProductType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState<string>("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductImage, setNewProductImage] = useState<File | null>(null);
  const [newProductCategory, setNewProductCategory] = useState<string>("");
  const [selectedProductList, setSelectedProductList] =
    useState("Featured Products");
  const [isNewArrival, setIsNewArrival] = useState(false);

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const productData = await fetchProductTypes();
      console.log("Fetched products:", productData);

      setProducts(productData);

      /*----- Get all products with list_type "new-arrival" or if we have fewer than 4, add some featured products to make it 4 -----*/
      const newArrivalProducts = productData.filter(
        (p: ProductType) => p.list_type === "new-arrival"
      );

      /*----- If we have fewer than 4 new arrivals, add some featured products to make it 4-----*/
      if (newArrivalProducts.length < 4) {
        const featuredProducts = productData.filter(
          (p: ProductType) => p.list_type === "featured"
        );
        const additionalProducts = featuredProducts.slice(
          0,
          4 - newArrivalProducts.length
        );

        /*-----  Mark these additional products as new arrivals temporarily -----*/
        additionalProducts.forEach((product: ProductType) => {
          product.list_type = "new-arrival";
        });

        setNewArrivals([...newArrivalProducts, ...additionalProducts]);
      } else {
        /*----- If we have 4 or more new arrivals, just take the first 4 -----*/
        setNewArrivals(newArrivalProducts.slice(0, 4));
      }

      setFeaturedProducts(
        productData
          .filter((p: ProductType) => p.list_type === "featured")
          .slice(0, 2)
      );

      const categoryData = await fetchCategory();
      console.log("Fetched categories:", categoryData);
      setCategories(categoryData);
    };

    loadData();
  }, []);

  useEffect(() => {
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
  }, []);

  const handleDeleteProduct = async (id: number, fromFeatured: boolean) => {
    try {
      await fetchDeleteProductType(id);
      if (fromFeatured) {
        setFeaturedProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        setNewArrivals((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      product_name: newProductName,
      img_url: newProductImage ? newProductImage.name : "placeholder.jpg",
      product_details: newProductDescription,
      price: parseFloat(newProductPrice),
      category_id: parseInt(newProductCategory),
      subcategory_id: 1,
      list_type:
        selectedProductList === "New Arrivals" ? "new-arrival" : "featured",
    };

    try {
      const createdProduct = await fetchCreateProductType(newProduct);

      // Uppdatera produktlistorna lokalt efter skapandet
      if (createdProduct.list_type === "new-arrival") {
        setNewArrivals((prev) => [...prev, createdProduct]);
      } else {
        setFeaturedProducts((prev) => [...prev, createdProduct]);
      }

      setNewProductName("");
      setNewProductPrice("");
      setNewProductDescription("");
      setNewProductCategory("Electronics");
      setNewProductImage(null);
      setIsNewArrival(false);
      setSelectedProductList("Featured Products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
    fromFeatured: boolean
  ) => {
    const updatedImage = event.target.files?.[0];
    if (updatedImage) {
      const imageUrl = URL.createObjectURL(updatedImage);
      const update = (products: ProductType[]) =>
        products.map((p) => (p.id === id ? { ...p, imageUrl } : p));
      fromFeatured
        ? setFeaturedProducts((prev) => update(prev))
        : setNewArrivals((prev) => update(prev));
    }
  };

  const handlePriceChange = (
    id: number,
    newPrice: number,
    fromFeatured: boolean
  ) => {
    const update = (products: ProductType[]) =>
      products.map((p) => (p.id === id ? { ...p, price: newPrice } : p));
    fromFeatured
      ? setFeaturedProducts((prev) => update(prev))
      : setNewArrivals((prev) => update(prev));
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">SUMMER COLLECTION 2025</h1>
          <p className="hero-description">
            Discover our latest products with amazing deals and discounts.
            Limited time offers available.
          </p>
          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      {isAdmin && (
        <section className="admin-panel">
          <h2 className="section-title">ADMIN PANEL</h2>
          <p className="selection-description">
            Add a new product to the store by filling out the form below.
          </p>

          <form className="selection-container">
            <div className="first-column">
              <select
                className="select-category"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              >
                <option value="">-- Select Product --</option>
                {products.map((pro) => (
                  <option key={pro.id} value={pro.product_name.toString()}>
                    {pro.product_name}
                  </option>
                ))}
              </select>
              <input
                className="input-field-admin"
                type="number"
                placeholder="Price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
              />
              <textarea
                className="text-field-admin"
                placeholder="Description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
              />
            </div>

            <div className="second-column">
              <select
                className="select-category"
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
              <select
                className="select-product-list"
                value={selectedProductList}
                onChange={(e) => setSelectedProductList(e.target.value)}
              >
                <option value="Featured Products">Featured Products</option>
                <option value="New Arrivals">New Arrivals</option>
              </select>

              <div className="flex justify-center items-center gap-2">
                <input
                  className="select-file"
                  type="file"
                  onChange={(e) =>
                    setNewProductImage(e.target.files?.[0] || null)
                  }
                />
              </div>
            </div>
          </form>

          <div className="admin-buttons">
            <button className="add-product-button" onClick={handleAddProduct}>
              Add Product
            </button>
            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </section>
      )}

      <section className="products-section">
        <h2 className="section-title">NEW ARRIVALS</h2>
        <div>
          <ProductGrid
            products={newArrivals}
            handleDeleteProduct={(id) => handleDeleteProduct(id, false)}
            handleImageChange={(id, e) => handleImageChange(id, e, false)}
            handlePriceChange={(id, price) =>
              handlePriceChange(id, price, false)
            }
            isAdmin={isAdmin}
          />
        </div>
      </section>

      <section>
        <PictureGallery />
      </section>

      <section className="products-section">
        <h2 className="section-title">FEATURED PRODUCTS</h2>
        <div className="featured-products">
          <ProductGrid
            products={featuredProducts}
            handleDeleteProduct={(id) => handleDeleteProduct(id, true)}
            handleImageChange={(id, e) => handleImageChange(id, e, true)}
            handlePriceChange={(id, price) =>
              handlePriceChange(id, price, true)
            }
            isAdmin={isAdmin}
          />
        </div>
      </section>

      <section>
        <OffersGallery />
      </section>
    </div>
  );
};

export default Home;
