import { useState } from "react";
import { CarouselItem } from "./CarouselItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";

import "../Styles/temp.css";

export const ImageCarousel = ({ items, cosmeticType }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      {items.length === 0 ? ( // Render "no images" message when there are no items
        <div className="no-images-carousel">
          <span>no images!</span>
        </div>
      ) : (
        // Render carousel when there are items
        <>
          <div
            className="inner"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                item={item}
                cosmeticType={cosmeticType}
                width="100%"
              />
            ))}
          </div>
          <div className="carousel-buttons">
            <button
              className="button-arrow"
              onClick={() => updateIndex(activeIndex - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="indicators">
              {items.map((item, index) => (
                <button
                  key={index}
                  className="indicator-buttons"
                  onClick={() => updateIndex(index)}
                >
                  <span
                    className={`material-symbols-outlined ${
                      index === activeIndex
                        ? "indicator-symbol-active"
                        : "indicator-symbol"
                    }`}
                  >
                    radio_button_checked
                  </span>
                </button>
              ))}
            </div>
            <button
              className="button-arrow"
              onClick={() => updateIndex(activeIndex + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
