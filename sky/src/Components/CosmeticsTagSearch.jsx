import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "../Styles/components/cosmeticsTagSearch.css";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

import { CosmeticTag } from "./CosmeticTag";

export const CosmeticsTagSearch = ({ toggleFunction, onTagSelect }) => {
  const [cosmeticTags, setCosmeticTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    setLoading(true);
    const query = e.target.elements.searchInput.value.trim();

    const { data, error } = await supabase
      .from("cosmetics")
      .select("*, cosmetic_images(image_url), cosmetic_types(name)") // Join both tables
      .ilike("name", `%${query}%`)
      .limit(20);

    if (error) {
      console.error("Error fetching cosmetics:", error);
      setLoading(false);
      return;
    }

    // Extract first image URL and type name for each cosmetic
    const formattedData = data.map((cosmetic) => ({
      ...cosmetic,
    }));

    setCosmeticTags(formattedData);
    setLoading(false);
    console.log(formattedData);
  };

  const handleTagClick = (cosmetic) => {
    onTagSelect(cosmetic);
    toggleFunction();

    console.log("tag clicked", cosmetic);
  };

  return (
    <div className="cts-container">
      <div className="cts-header">
        <span className="cts-header-name">Cosmetic Tags</span>
        <FontAwesomeIcon
          icon={faXmark}
          className="cts-close"
          onClick={toggleFunction}
        />
      </div>

      <div className="cts-search-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchInput"
            placeholder="Search for cosmetics..."
            className="cts-search-bar"
          />
        </form>
      </div>

      <div className="cts-results">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <div className="cts-column">
              {cosmeticTags
                .filter((_, index) => index % 2 === 0)
                .map(
                  (cosmetic) => (
                    console.log(cosmetic.cosmetic_types.name),
                    (
                      <CosmeticTag
                        key={cosmetic.id}
                        icon={cosmetic.icon}
                        display={cosmetic.cosmetic_images[0].image_url}
                        name={cosmetic.name}
                        type={cosmetic.cosmetic_types.name}
                        onClick={() => handleTagClick(cosmetic)}
                      />
                    )
                  )
                )}
            </div>

            <div className="cts-column">
              {cosmeticTags
                .filter((_, index) => index % 2 !== 0)
                .map((cosmetic) => (
                  <CosmeticTag
                    key={cosmetic.id}
                    icon={cosmetic.icon}
                    display={cosmetic.cosmetic_images[0].image_url}
                    name={cosmetic.name}
                    type={cosmetic.cosmetic_types.name}
                    onClick={() => handleTagClick(cosmetic)}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
