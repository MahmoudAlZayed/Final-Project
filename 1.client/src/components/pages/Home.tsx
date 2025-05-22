// Peter:

// import React from "react";
// import { Link } from "react-router-dom";
// import ProductGrid from "../product/ProductGrid";
// import "./Home.css";
// import { Product } from "../../types";

// const Home: React.FC = () => {

//   // Sample products data - this would normally come from an API
//   const featuredProducts: Product[] = [
//     {
//       id: 1,
//       name: "Smartphone X",
//       price: 699.99,
//       description: "Latest smartphone with advanced features",
//       category: "Electronics",
//       imageUrl: "/images/smartphone.jpg",
//       inStock: true,
//     },
//     {
//       id: 2,
//       name: "Wireless Headphones",
//       price: 149.99,
//       description: "Premium wireless headphones with noise cancellation",
//       category: "Electronics",
//       imageUrl: "/images/headphones.jpg",
//       inStock: true,
//     },
//     {
//       id: 3,
//       name: "Smart Watch",
//       price: 249.99,
//       description: "Fitness tracker and smartwatch with health monitoring",
//       category: "Electronics",
//       imageUrl: "/images/smartwatch.jpg",
//       inStock: false,
//     },
//   ];

//   const newArrivals: Product[] = [
//     {
//       id: 4,
//       name: "Cotton T-Shirt",
//       price: 24.99,
//       description: "Comfortable cotton t-shirt in various colors",
//       category: "Clothing",
//       imageUrl: "/images/tshirt.jpg",
//       inStock: true,
//     },
//     {
//       id: 5,
//       name: "Desk Lamp",
//       price: 39.99,
//       description: "Modern desk lamp with adjustable brightness",
//       category: "Home & Garden",
//       imageUrl: "/images/lamp.jpg",
//       inStock: true,
//     },
//     {
//       id: 6,
//       name: "Face Cream",
//       price: 29.99,
//       description: "Hydrating face cream for all skin types",
//       category: "Beauty",
//       imageUrl: "/images/facecream.jpg",
//       inStock: true,
//     },
//   ];

//   //This section was already in a comment :

//   // In a real application, you would fetch products from an API
//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       // const data = await fetchFeaturedProducts();
//   //       // setFeaturedProducts(data);
//   //       // const newArrivalsData = await fetchNewArrivals();
//   //       // setNewArrivals(newArrivalsData);
//   //     } catch (error) {
//   //       console.error("Failed to fetch products:", error);
//   //     }
//   //   };
//   //   fetchProducts();
//   // }, []);

//   //This section was already in a comment.

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-container">
//           <h1 className="hero-title">Summer Collection 2025</h1>
//           <p className="hero-description">
//             Discover our latest products with amazing deals and discounts.
//             Limited time offers available.
//           </p>
//           <Link to="/products" className="hero-button">
//             Shop Now
//           </Link>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="categories-section">
//         <div className="categories-grid">
//           {["Electronics", "Clothing", "Home & Garden", "Beauty"].map(
//             (category) => (
//               <div key={category} className="category-card">
//                 <div className="category-icon">{category.charAt(0)}</div>
//                 <h3 className="category-title">{category}</h3>
//               </div>
//             )
//           )}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="products-section">
//         <h2 className="section-title">Featured Products</h2>
//         <ProductGrid products={featuredProducts} />
//          {/* Mahmoud commented this line to use the line below */}

//       </section>

//       {/* New Arrivals */}
//       <section className="products-section">
//         <h2 className="section-title">New Arrivals</h2>
//         <ProductGrid products={newArrivals} />
//         {/* Mahmoud commented this line to use the line below */}

//       </section>
//     </div>
//   );
// };

// export default Home;

//Peter

//Mahmoud :

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";
import PictureGallery from "../layout/PictureGallery";
import "./Home.css";
import { Product } from "../../types";
import { jwtDecode } from "jwt-decode";
import OffersGallery from "../layout/OffersGallery";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState<number | string>("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductImage, setNewProductImage] = useState<File | null>(null);
  const [newProductCategory, setNewProductCategory] = useState("Electronics");
  const [selectedProductList, setSelectedProductList] =
    useState("Featured Products");
  const [isNewArrival, setIsNewArrival] = useState(false);

  const fetchProducts = async () => {
    const fetchedFeaturedProducts = [
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
    const fetchedNewArrivals = [
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
    setFeaturedProducts(fetchedFeaturedProducts);
    setNewArrivals(fetchedNewArrivals);
  };

  useEffect(() => {
    fetchProducts();
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

  const handleDeleteProduct = (id: number, fromFeatured: boolean) => {
    if (fromFeatured) {
      setFeaturedProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      setNewArrivals((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: newProductName,
      price: parseFloat(newProductPrice.toString()),
      description: newProductDescription,
      category: newProductCategory,
      imageUrl: newProductImage
        ? URL.createObjectURL(newProductImage)
        : "/images/placeholder.jpg",
      inStock: true,
    };
    if (selectedProductList === "Featured Products") {
      setFeaturedProducts((prev) => [...prev, newProduct]);
    } else {
      setNewArrivals((prev) => [...prev, newProduct]);
    }

    setNewProductName("");
    setNewProductPrice("");
    setNewProductDescription("");
    setNewProductImage(null);
    setNewProductCategory("Electronics");
    setSelectedProductList("Featured Products");
  };

  const handleImageChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
    fromFeatured: boolean
  ) => {
    const updatedImage = event.target.files?.[0];
    if (updatedImage) {
      const imageUrl = URL.createObjectURL(updatedImage);
      const update = (products: Product[]) =>
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
    const update = (products: Product[]) =>
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
              <input
                className="input-field-admin"
                type="text"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
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
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Beauty">Beauty</option>
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
                <label className="select-new-arrival">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                  />
                  New Arrival
                </label>
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
        <ProductGrid
          products={newArrivals}
          handleDeleteProduct={(id) => handleDeleteProduct(id, false)}
          handleImageChange={(id, e) => handleImageChange(id, e, false)}
          handlePriceChange={(id, price) => handlePriceChange(id, price, false)}
          isAdmin={isAdmin}
        />
      </section>

      <section>
        <PictureGallery />
      </section>

      <section className="products-section">
        <h2 className="section-title">FEATURED PRODUCTS</h2>
        <ProductGrid
          products={featuredProducts}
          handleDeleteProduct={(id) => handleDeleteProduct(id, true)}
          handleImageChange={(id, e) => handleImageChange(id, e, true)}
          handlePriceChange={(id, price) => handlePriceChange(id, price, true)}
          isAdmin={isAdmin}
        />
      </section>

      <section>
        <OffersGallery />
      </section>
    </div>
  );
};

export default Home;

//Mahmoud
