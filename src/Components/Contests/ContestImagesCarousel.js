import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useRef, useState } from "react";
import "../../Styles/ContestImagesCarousel.scss";

export default function ImageCarousel(props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setSelectedImage(props.images[0]);
    setImages(props.images);
  }, [props.images]);

  const handleSelectedImageChange = (newIndex) => {
    setSelectedImage(images[newIndex]);
    setSelectedImageIndex(newIndex);
    document.getElementById("IMG" + newIndex).scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIndex = selectedImageIndex + 1;
      if (newIndex >= images.length) {
        newIndex = 0;
      }
      handleSelectedImageChange(newIndex);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIndex = selectedImageIndex - 1;
      if (newIndex < 0) {
        newIndex = images.length - 1;
      }
      handleSelectedImageChange(newIndex);
    }
  };

  return (
    <div className="carousel-container">
      <div
        className="selectedimage"
        style={{ backgroundImage: `url('${selectedImage}')` }}
      />
      <div className="carousel">
        <button
          className="carousel-button carouse-button-left"
          onClick={handleLeftClick}
        >
          <i className="fi fi-rr-arrow-small-left"></i>
        </button>
        <div className="carousel-images">
          {images.map((image, index) => {
            return (
              <div
                onClick={() => handleSelectedImageChange(index)}
                style={{ backgroundImage: `url('${image}')` }}
                key={index}
                className={
                  index === selectedImageIndex
                    ? "small-selected-image image"
                    : "image"
                }
                id={"IMG" + index}
              />
            );
          })}
        </div>
        <button
          className="carousel-button carousel-button-right"
          onClick={handleRightClick}
        >
          <i className="fi fi-rr-arrow-small-right"></i>
        </button>
      </div>
    </div>
  );
}
