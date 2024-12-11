import NavBar from "../Components/NavBar";
import styled from "styled-components";
import Closet from "../Components/Closet";
import { useLoaderData } from "react-router-dom";
import CosmeticIcon from "../Components/CosmeticIcon";
import { useState } from "react";

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

  const cosmetics = useLoaderData();
  const [searchResults, setSearchResults] = useState(cosmetics);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //search by input
  const handleSearch = (query) => {
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
    const filtered = cosmetics.filter(
      (cosmetic) => cosmetic.type_id === category
    );
    setSearchResults(filtered);
    setSelectedCategory(category);
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
            // backgroundColor: "orange",
            height: "50vh",
            padding: "20px 15px",
          }}
        >
          <div
            style={{
              // backgroundColor: "blue",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              // height: "100%",
              // width: "100%",
            }}
          >
            {searchResults.length === 0 ? (
              <span>not added yet!</span>
            ) : (
              searchResults.map((cosmetic) => {
                return (
                  <CosmeticIcon
                    key={cosmetic.id}
                    cosmetic={cosmetic}
                  ></CosmeticIcon>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cosmetics;
