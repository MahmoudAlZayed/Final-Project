import React from "react";
import "../layout/offersGallery.css";
import { abstract } from "../../assets/images";

const OffersGallery = () => {
  const offersTexts = [
    { percent: "30%", text: "sale on accessories" },
    { percent: "Free", text: "shipping on orders over $50" },
    { percent: "New", text: "Limited edition items in stock" },
  ];

  return (
    <div className="offers-container">
      <div className="offers-sale-box">
        <div className="offers-sale-text-box">
          <p className="offers-procent-text">30%</p>
          <p className="offers-sale-text">sale on accessories</p>
        </div>

        <div
          className="offers-student-discount-box"
          style={{
            backgroundImage: `url(${abstract})`,
          }}
        >
          <div className="offers-student-discount-text-box">
            <p className="offers-student-discount-text">10%</p>
            <p className="offers-sale-text">student discount</p>
          </div>
        </div>

        {offersTexts.slice(1).map((item, i) => (
          <div key={i} className="offers-sale-text-box">
            <p className="offers-procent-text">{item.percent}</p>
            <p className="offers-sale-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersGallery;
