import NavBar from "../Components/NavBar";
import styled from "styled-components";
import Closet from "../Components/Closet";
import { useLoaderData } from "react-router-dom";
import CosmeticIcon from "../Components/CosmeticIcon";
import { useState, useEffect } from "react";
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
  const loadMoreCosmetics = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let query = supabase.from("cosmetics").select("*");

      // Apply search query if one exists
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery.toLowerCase()}%`); // Adjust for Supabase's `ilike` operator
      }

      // Apply category filter if one is selected
      if (selectedCategory) {
        query = query.eq("type_id", selectedCategory);
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
  };

  // Detect scroll event to load more cosmetics when near bottom
  useEffect(() => {
    if (allLoaded) return;

    let lastLoadedTime = Date.now();

    //load more very .1 seconds
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && Date.now() - lastLoadedTime >= 100) {
          lastLoadedTime = Date.now();
          loadMoreCosmetics();
        }
      },
      { threshold: 1.0 }
    );

    const loadMoreElement = document.getElementById("loadMore");
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [loading]);

  //search by input
  const handleSearch = (query) => {
    setSearchQuery(query); // Track the current search query
    setPage(1); // Reset pagination
    setAllLoaded(false); // Allow more items to be loaded

    const filtered = cosmetics.filter((cosmetic) =>
      cosmetic.name
        .replace(/_/g, " ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  // filter results by category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Track the selected category
    setPage(1); // Reset pagination
    setAllLoaded(false); // Allow more items to be loaded

    const filtered = cosmetics.filter(
      (cosmetic) => cosmetic.type_id === category
    );
    setSearchResults(filtered);
  };

  return (
    <div>
      <NavBar page="cosmeticPage" onSearch={handleSearch} />
      <div>
        <ClosetSelectSection>
          <ClosetContainer>
            <Closet
              cosmeticCategory="outfit"
              onClick={() => handleCategorySelect("1")}
            ></Closet>
            <Closet
              cosmeticCategory="masks"
              onClick={() => handleCategorySelect("2")}
            ></Closet>
            <Closet
              cosmeticCategory="hair"
              onClick={() => handleCategorySelect("3")}
            ></Closet>
            <Closet
              cosmeticCategory="capes"
              onClick={() => handleCategorySelect("4")}
            ></Closet>
            <Closet
              cosmeticCategory="props"
              onClick={() => handleCategorySelect("5")}
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
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Cosmetics;
