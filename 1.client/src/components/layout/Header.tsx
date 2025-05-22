import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";
import "./header.css";
import logo from "/public/logo_webshop.png";

const Header = () => {
  const { getCartTotal } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header>
      <div className="header">
        <div className="header-container">
          <div className="header-content">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <div className="header-search">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <nav className="header-nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/products" className="nav-link">
                Shop
              </Link>
              <Link to="/cart" className="nav-link">
                Cart ({getCartTotal()})
              </Link>
              <Link to="/login" className="nav-link">
                Account
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
