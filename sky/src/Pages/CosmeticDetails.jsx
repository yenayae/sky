import { useLoaderData } from "react-router";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CosmeticIcon from "../Components/CosmeticIcon";
import { supabase } from "../supabase/supabaseClient";
import { ImageCarousel } from "../Components/ImageCarousel";

const Details = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  // background-color: pink;
  justify-content: center;
`;

const DetailsImage = styled.img`
  width: 200px;
  height: auto;
`;

const ImageBox = styled.div`
  padding: 20px;
  border: 1px solid #dadada;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
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

  console.log(cosmeticInfo);

  const cosmeticName = extractName(cosmeticInfo.name);
  useState(() => {
    document.title = cosmeticName;
  }, []);

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

  //load in cosmetic details
  useEffect(() => {
    const fetchCosmeticImages = async () => {
      if (!cosmeticTypes.length) return; // Ensure cosmeticTypes is loaded

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
        console.log("cosmetic type", type);
      } catch (error) {
        console.error("Error fetching cosmetic images:", error);
      }
    };

    if (cosmeticInfo?.id) {
      fetchCosmeticImages();
    }
  }, [cosmeticInfo.id, cosmeticTypes]);

  return (
    <div>
      <NavBar></NavBar>
      <Details>
        <ImageCarousel
          items={cosmeticImages}
          cosmeticType={cosmeticType}
        ></ImageCarousel>
        <DetailsBox>
          <DetailsTitle>
            <DetailsH1>{cosmeticName}</DetailsH1>
          </DetailsTitle>
          <div>
            <CosmeticIcon
              key={cosmeticInfo.id}
              cosmetic={cosmeticInfo}
              cosmeticTypes={cosmeticTypes}
              index={10}
            ></CosmeticIcon>
            <p>
              Price: {cosmeticInfo.costNum} {cosmeticInfo.costType}
            </p>
          </div>
        </DetailsBox>
      </Details>
    </div>
  );
};

export default CosmeticDetails;
