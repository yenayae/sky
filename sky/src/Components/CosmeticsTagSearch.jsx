import "../Styles/components/cosmeticsTagSearch.css";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

import { CosmeticTag } from "./CosmeticTag";

export const CosmeticsTagSearch = () => {
  const [cosmeticTags, setCosmeticTags] = useState([]);

  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    const query = e.target.elements.searchInput.value.trim();

    const { data, error } = await supabase
      .from("cosmetics")
      .select("*, cosmetic_images(image_url), cosmetic_types(name)") // Join both tables
      .ilike("name", `%${query}%`);

    if (error) {
      console.error("Error fetching cosmetics:", error);
      return;
    }

    // Extract first image URL and type name for each cosmetic
    const formattedData = data.map((cosmetic) => ({
      ...cosmetic,
      display: cosmetic.cosmetic_images?.[0]?.image_url || "", // Get first image URL
      typeName: cosmetic.cosmetic_types?.name || "Unknown", // Get type name
    }));

    setCosmeticTags(formattedData);
    console.log(formattedData);
  };

  return (
    <div className="cts-container">
      <div className="cts-search-wrapper">
        <span>Cosmetic Tags</span>
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
        <div className="cts-column">
          {cosmeticTags
            .filter((_, index) => index % 2 === 0)
            .map((cosmetic) => (
              <CosmeticTag
                key={cosmetic.id}
                icon={cosmetic.icon}
                display={cosmetic.cosmetic_images?.[0]?.image_url || ""}
                name={cosmetic.name}
                type={cosmetic.typeName}
              />
            ))}
        </div>

        <div className="cts-column">
          {cosmeticTags
            .filter((_, index) => index % 2 !== 0)
            .map((cosmetic) => (
              <CosmeticTag
                key={cosmetic.id}
                icon={cosmetic.icon}
                display={cosmetic.cosmetic_images?.[0]?.image_url || ""}
                name={cosmetic.name}
                type={cosmetic.typeName}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
