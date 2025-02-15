import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export const SelectedCosmeticTagDisplay = ({
  selectedCosmeticTags,
  toggleFunction,
  removeFunction,
}) => {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 974px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 974px)")
      .addEventListener("change", (e) => setIsDesktop(e.matches));
  }, []);

  return (
    <div className="tag-display-container">
      <div className={`tag-display-tags ${isDesktop ? "desktop" : "mobile"}`}>
        {selectedCosmeticTags.map((cosmetic) => (
          <div className="tag-display-tag" key={cosmetic.id}>
            <img
              className="tag-display-icon"
              src={`/img/cosmetics/${cosmetic.typeName}_icons/${cosmetic.icon}`}
              alt={cosmetic.name}
            />
            <FontAwesomeIcon
              onClick={() => removeFunction(cosmetic)}
              icon={faXmark}
              className="tag-display-x"
            />
          </div>
        ))}
        {selectedCosmeticTags.length >= 10 ? (
          ""
        ) : (
          <div className="add-more-tags" onClick={toggleFunction}>
            <FontAwesomeIcon icon={faPlus} className="tag-plus-icon" />
          </div>
        )}
      </div>
    </div>
  );
};
