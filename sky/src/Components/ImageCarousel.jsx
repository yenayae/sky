import { useState, useEffect } from "react";
import { CosmeticCarouselItem } from "./CosmeticCarouselItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

import "../Styles/components/imageCarousel.css";
import { FileCarouselItem } from "./FileCarouselItem";

export const ImageCarousel = ({
  items,
  cosmeticType,
  loadState,
  pageContext,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstImageHeight, setFirstImageHeight] = useState(null);
  const CAROUSEL_WIDTH = 400;

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    console.log("clickc", newIndex);

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (items.length > 0) {
      const firstImg = new Image();
      firstImg.src = items[0];
      firstImg.onload = () => {
        const aspectRatio = firstImg.height / firstImg.width;
        const scaledHeight = CAROUSEL_WIDTH * aspectRatio;
        setFirstImageHeight(scaledHeight);
      };
    }
  }, [items]);

  return (
    <div
      style={{ width: `${CAROUSEL_WIDTH}px` }}
      className={`carousel ${pageContext} ${
        items.length === 0 ? "" : "image-carousel-filled"
      }`}
    >
      {loadState ? (
        <div className="loader">Loading...</div>
      ) : items.length === 0 ? (
        //if items is empty, then either no images or images yet to be added on post page

        pageContext === "postPage" ? (
          <div className="post-images-carousel">
            <FontAwesomeIcon className="plus-icon" icon={faSquarePlus} />
          </div>
        ) : (
          <div className="no-images-carousel">
            <span>no images!</span>
          </div>
        )
      ) : (
        // Render carousel when there are items
        <>
          <div
            className="inner"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.4s ease-in-out",
              height: firstImageHeight ? `${firstImageHeight}px` : "auto",
            }}
          >
            {items.map((item, index) =>
              pageContext === "postPage" ? (
                <FileCarouselItem
                  key={index}
                  item={item}
                  itemIndex={index}
                  // height={index === 0 ? `${firstImageHeight}px` : "auto"} // Correct syntax
                />
              ) : (
                <CosmeticCarouselItem
                  key={index}
                  item={item}
                  cosmeticType={cosmeticType}
                  width="100%"
                />
              )
            )}
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
