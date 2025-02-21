import { useLoaderData, useNavigate } from "react-router";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CosmeticIcon from "../Components/CosmeticIcon";
import { supabase } from "../supabase/supabaseClient";
import { ImageCarousel } from "../Components/ImageCarousel";
import useFormatName from "../Hooks/formatName";
import useFormatPrice from "../Hooks/formatPrice";

const Details = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: rgb(248, 248, 248);
  border-radius: 10px;
  justify-content: center;
  width: 80%;
`;

const DetailsH1 = styled.h1`
  margin: 0;
  font-size: 2em;
`;

const DetailsTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DetailsBox = styled.div`
  padding: 0 20px;
  width: 60%;
  // background-color: green;
`;

function extractName(name) {
  return name
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const CosmeticDetails = () => {
  const cosmeticInfo = useLoaderData();
  const [cosmeticTypes, setCosmeticTypes] = useState([]);

  const cosmeticImages = cosmeticInfo.cosmetic_images;
  const cosmeticType = cosmeticInfo.cosmetic_types.name;

  const navigate = useNavigate();

  //set tab name to cosmetic name
  const cosmeticName = extractName(cosmeticInfo.name);
  useState(() => {
    document.title = cosmeticName;
  }, []);

  //for navbar search redirect
  const handleSearchRedirect = (searchTerm) => {
    navigate(`/cosmetics?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <NavBar page="cosmeticDetails" onSearch={handleSearchRedirect}></NavBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Details>
          <ImageCarousel
            items={cosmeticImages}
            cosmeticType={cosmeticType}
            pageContext={"cosmeticDetails"}
          />

          <DetailsBox>
            <DetailsTitle>
              <DetailsH1>{useFormatName(cosmeticName)}</DetailsH1>
            </DetailsTitle>
            <div>
              <CosmeticIcon
                key={cosmeticInfo.id}
                cosmetic={cosmeticInfo}
                cosmeticTypes={cosmeticTypes}
                index={10}
              ></CosmeticIcon>
              <p>
                Price:{" "}
                {useFormatPrice(cosmeticInfo.costNum, cosmeticInfo.costType)}
              </p>
            </div>
          </DetailsBox>
        </Details>
      </div>
    </div>
  );
};

export default CosmeticDetails;
