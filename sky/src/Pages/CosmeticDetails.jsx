import { useLoaderData } from "react-router";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CosmeticIcon from "../Components/CosmeticIcon";

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

function createImageFileLink(url, type_id) {
  let type;
  if (type_id === "1") {
    type = "outfit";
  }
  if (type_id === "2") {
    type = "masks";
  }

  return `/img/cosmetics/${type}_view/${url}`;
}

const CosmeticDetails = () => {
  const cosmeticInfo = useLoaderData();
  const [cosmeticImages, setCosmeticImages] = useState([]);

  const cosmeticName = extractName(cosmeticInfo.name);
  useState(() => {
    document.title = cosmeticName;
  }, []);

  //load in cosmetic details
  useEffect(() => {
    fetch(`http://localhost:3000/cosmeticImages?cosmetic_id=${cosmeticInfo.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cosmetic images");
        }
        return response.json();
      })
      .then((images) => {
        setCosmeticImages(images);
      })
      .catch((error) => {
        console.error("Error fetching cosmetic images:", error);
      });
  }, [cosmeticInfo.id]);

  return (
    <div>
      <NavBar></NavBar>
      <Details>
        <ImageBox>
          {cosmeticImages.length > 0 ? (
            cosmeticImages.map((image) => (
              <DetailsImage
                key={image.id}
                src={createImageFileLink(image.url, cosmeticInfo.type_id)}
                alt={image.caption || "Image"}
              />
            ))
          ) : (
            <p>No image provided</p>
          )}
        </ImageBox>
        <DetailsBox>
          <DetailsTitle>
            <DetailsH1>{cosmeticName}</DetailsH1>
          </DetailsTitle>
          <div>
            <CosmeticIcon cosmetic={cosmeticInfo} />
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
