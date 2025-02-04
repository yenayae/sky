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
  const [cosmeticImages, setCosmeticImages] = useState([]);
  const [cosmeticTypes, setCosmeticTypes] = useState([]);
  const [cosmeticType, setCosmeticType] = useState(null);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const navigate = useNavigate();

  //set tab name to cosmetic name
  const cosmeticName = extractName(cosmeticInfo.name);
  useState(() => {
    document.title = cosmeticName;
  }, []);

  //load in cosmetic types
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

  //load in cosmetic images
  useEffect(() => {
    const fetchCosmeticImages = async () => {
      if (!cosmeticTypes.length) return; // Ensure cosmeticTypes is loaded

      setIsLoadingImages(true);
      try {
        const { data: cosmetic_images, error } = await supabase
          .from("cosmetic_images")
          .select("id, image_url, alt_caption")
          .eq("cosmetic_id", cosmeticInfo.id);

        if (error) {
          throw error;
        }

        setCosmeticImages(cosmetic_images);
        let type = cosmeticTypes.find(
          (type) => type.id === cosmeticInfo.type_id
        ).name;
        if (type.includes("props")) {
          type = "props";
        }

        setCosmeticType(type);
        setIsLoadingImages(false);
      } catch (error) {
        console.error("Error fetching cosmetic images:", error);
      }
    };

    if (cosmeticInfo?.id) {
      fetchCosmeticImages();
    }
  }, [cosmeticInfo.id, cosmeticInfo.type_id, cosmeticTypes]);

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
            loadState={isLoadingImages}
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
