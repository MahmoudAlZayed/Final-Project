import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-heading">Shop</h3>
            <ul className="footer-list">
              <li>
                <Link to="/products/new" className="footer-link">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products/bestsellers" className="footer-link">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/products/deals" className="footer-link">
                  Deals & Promotions
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="footer-link">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Customer Service</h3>
            <ul className="footer-list">
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="footer-link">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="footer-link">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>
            <ul className="footer-list">
              <li>
                <Link to="/about" className="footer-link">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/careers" className="footer-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="footer-link">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              <li>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="footer-link">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="footer-link">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
