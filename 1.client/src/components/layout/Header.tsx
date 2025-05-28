import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";
import "./header.css";
import logo from "/public/logo_webshop.png";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { getCartTotal } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <div className="header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo and Brand Name */}

            <div className="brand-section">
              <Link to="/">
                <img src={logo} alt="logo" className="logo" />
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}

            <div className="header-search">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Links - Desktop */}
            <nav
              className={`header-nav ${
                mobileMenuOpen ? "mobile-menu-open" : ""
              }`}
            >
              <Link
                to="/women"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/men"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/kids"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kids
              </Link>
              <Link
                to="/footwear"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Footwear
              </Link>
              <Link
                to="/accessories"
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>

              {/* Icons */}
              <div className="nav-icons">
                <Link
                  to="/cart"
                  className="icon-link"
                  aria-label="Shopping Cart"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaShoppingCart className="nav-icon" />
                </Link>
                <Link
                  to="/login"
                  className="icon-link"
                  aria-label="Account"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser className="nav-icon" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
