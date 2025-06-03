import React from "react";
import "../layout/pitureGallery.css";
import { Link } from "react-router-dom";
import { women2, glasses } from "../../assets/images";

const PictureGallery = () => {
  const galleryItems = [
    { image: glasses, text: "New Collection Out Now" },
    { image: women2, text: "Summer Sale 50% Off" },
  ];
  return (
    <div className="gallery-container">
      {galleryItems.map((item, i) => (
        <div
          key={i}
          className="gallery-img"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="gallery-overlay">
            <Link to="/" className="gallery-text">
              {item.text}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PictureGallery;
