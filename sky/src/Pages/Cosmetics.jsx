import NavBar from "../Components/NavBar";
import styled from "styled-components";
import Closet from "../Components/Closet";
import { useLoaderData } from "react-router-dom";
import CosmeticIcon from "../Components/CosmeticIcon";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase/supabaseClient";

const ClosetContainer = styled.div`
  background-color: rgba(16, 17, 36, 0.8);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 95%;
  border-radius: 10px;
`;

const ClosetSelectSection = styled.div`
  background-image: url("/img/assets/night.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cosmetics = () => {
  useState(() => {
    document.title = "Cosmetics Catalog";
  }, []);

  const initialCosmetics = useLoaderData();
  const [cosmetics, setCosmetics] = useState(initialCosmetics);
  const [searchResults, setSearchResults] = useState(initialCosmetics);
  const [searchState, setSearchState] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [page, setPage] = useState(2);
  const [cosmeticTypes, setCosmeticTypes] = useState([]);

  const LOAD_AMOUNT = 100;

  useEffect(() => {
    const fetchCosmeticTypes = async () => {
      const { data, error } = await supabase.from("cosmetic_types").select("*");
      if (error) {
        console.error("Error fetching cosmetic types:", error);
      } else {
        setCosmeticTypes(data);
      }
    };

    fetchCosmeticTypes();
  }, []);

  // Fetch more cosmetics when user scrolls near bottom
  const loadMoreCosmetics = useCallback(async () => {
    if (loading) return; //cancel if already loading in a batch
    setLoading(true);

    console.log("loading more stuff");
    try {
      let query = supabase.from("cosmetics").select(
        `
        *,
        cosmetic_types(id, parent_type)
      `
      );

      console.log(selectedCategory);
      console.log(searchState);

      // Apply search query if one exists
      if (searchQuery && searchState === "searchbar") {
        query = query.ilike("name", `%${searchQuery.toLowerCase()}%`);
      }

      // Apply category filter if one is selected
      if (selectedCategory && searchState === "category") {
        console.log("selectedCategory", selectedCategory);
        //convert category to id (potentially replace in the future)
        const categoryToTypeIds = {
          outfits: [1, 2],
          masks: [3, 4, 5],
          hair: [6, 7, 8],
          capes: [9],
          props: [10, 11, 12],
        };
        const typeIds = categoryToTypeIds[selectedCategory.toLowerCase()] || [];

        if (typeIds.length > 0) {
          query = query.in("type_id", typeIds);
        }

        // query = query.eq("cosmetic_types.parent_type", selectedCategory);
      }

      // Fetch LOAD_AMOUNT items per page
      const { data, error } = await query.range(
        (page - 1) * LOAD_AMOUNT,
        page * LOAD_AMOUNT - 1
      );

      if (error) {
        throw new Error("Error fetching cosmetics: " + error.message);
      }

      // Ensure no duplicates are added
      setCosmetics((prevCosmetics) => {
        const newCosmetics = data.filter(
          (item) => !prevCosmetics.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevCosmetics, ...newCosmetics];
      });

      setSearchResults((prevResults) => {
        const newResults = data.filter(
          (item) => !prevResults.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevResults, ...newResults];
      });

      if (data.length === 0) {
        setAllLoaded(true);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, searchQuery, searchState, selectedCategory, page]);

  // Detect if there's space at the bottom and load more cosmetics
  useEffect(() => {
    if (allLoaded) return;

    let lastLoadedTime = Date.now();

    // Function to check if loadMore element is visible
    const checkForMoreSpace = () => {
      const loadMoreElement = document.getElementById("loadMore");
      if (!loadMoreElement) return;

      const bounding = loadMoreElement.getBoundingClientRect();
      const isVisible =
        bounding.top < window.innerHeight && bounding.bottom >= 0;

      console.log("isVisible", isVisible);

      if (isVisible && Date.now() - lastLoadedTime >= 100) {
        lastLoadedTime = Date.now();
        loadMoreCosmetics();
      }
    };

    // IntersectionObserver to track visibility of loadMore
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          checkForMoreSpace();
        }
      },
      { threshold: 1.0 } // Trigger when loadMore is fully in view
    );

    const loadMoreElement = document.getElementById("loadMore");
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    const loadUntilNotVisible = () => {
      const interval = setInterval(() => {
        const isVisible = checkForMoreSpace();
        if (!isVisible) {
          clearInterval(interval); // stop the interval once loadMore is not visible
        }
      }, 500); // check every 500ms
    };

    // initial check for visibility in case loadMore is already in view
    loadUntilNotVisible();

    // Clean up observer when component unmounts or dependencies change
    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement); // Stop observing loadMore element
      }
    };
  }, [allLoaded, loadMoreCosmetics]);

  //search by input
  const handleSearch = (query) => {
    setSearchState("searchbar");
    setSearchQuery(query); // Track the current search query
    setPage(1); // Reset pagination

    const filtered = cosmetics.filter((cosmetic) =>
      cosmetic.name
        .replace(/_/g, " ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setSearchResults(filtered);

    // Allow more items to be loaded
    setAllLoaded(false);
  };

  // filter results by category
  const handleCategorySelect = (category) => {
    //prevent reloading same categories
    if (searchState === "category" && selectedCategory === category) return;

    setSearchState("category");
    setSelectedCategory(category); // Track the selected category
    setPage(1); // Reset pagination

    const filtered = cosmetics.filter(
      (cosmetic) => cosmetic.cosmetic_types.parent_type === category
    );
    setSearchResults(filtered);

    // Allow more items to be loaded
    setAllLoaded(false);
  };

  //monitor if category is selected and load more items
  useEffect(() => {
    if (searchState === "category" && !allLoaded) {
      loadMoreCosmetics();
    }
  }, [
    searchState,
    selectedCategory,
    searchResults,
    allLoaded,
    loadMoreCosmetics,
  ]);

  return (
    <div>
      <NavBar page="cosmeticPage" onSearch={handleSearch} />
      <div>
        <ClosetSelectSection>
          <ClosetContainer>
            <Closet
              cosmeticCategory="outfit"
              onClick={() => handleCategorySelect("outfits")}
            ></Closet>
            <Closet
              cosmeticCategory="masks"
              onClick={() => handleCategorySelect("masks")}
            ></Closet>
            <Closet
              cosmeticCategory="hair"
              onClick={() => handleCategorySelect("hair")}
            ></Closet>
            <Closet
              cosmeticCategory="capes"
              onClick={() => handleCategorySelect("capes")}
            ></Closet>
            <Closet
              cosmeticCategory="props"
              onClick={() => handleCategorySelect("props")}
            ></Closet>
          </ClosetContainer>
        </ClosetSelectSection>

        <div
          style={{
            height: "50vh",
            padding: "20px 15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {searchResults.length === 0 ? (
              <span>not added yet!</span>
            ) : (
              searchResults.map((cosmetic, i) => {
                return (
                  <CosmeticIcon
                    key={cosmetic.id}
                    cosmetic={cosmetic}
                    cosmeticTypes={cosmeticTypes}
                    index={i % LOAD_AMOUNT}
                  ></CosmeticIcon>
                );
              })
            )}
          </div>
          <div
            id="loadMore"
            style={{
              textAlign: "center",
              padding: "20px",
              cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: "pink",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Cosmetics;
