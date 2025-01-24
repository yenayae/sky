import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import useFormatName from "../Hooks/formatName";

// Keyframes for fade-in animation
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Icon = styled.img`
  background-color: ${(props) =>
    props.loading ? "transparent" : "rgba(20, 18, 14, 0.5)"};
  height: 85px;
  width: 85px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  opacity: 0; /* Start invisible */
  animation: ${(props) => (props.loading ? "none" : fadeIn)} 0.5s ease-in-out;
  animation-delay: ${(props) => props.index * 0.01}s; /* Stagger animation */
  animation-fill-mode: forwards; /* Ensure the final state persists */
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(20, 18, 14, 0.7);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -10px); /* Adjust for offset */
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  ${(props) =>
    props.show &&
    `
    opacity: 1;
    pointer-events: auto;
  `}
`;

const Wrapper = styled.div`
  position: relative; /* Ensure tooltip is positioned relative to this container */
  display: inline-block;
`;

export default function CosmeticIcon({ cosmetic, cosmeticTypes, index }) {
  const [cosmeticPath, setCosmeticPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const findCosmeticType = () => {
      const type = cosmeticTypes.find((type) => type.id === cosmetic.type_id);
      if (type) {
        let category = type.name.includes("props") ? "props" : type.name;
        setCosmeticPath(`/img/cosmetics/${category}_icons/${cosmetic.icon}`);
      }
    };

    if (cosmeticTypes.length > 0) {
      findCosmeticType();
    }
  }, [cosmetic.type_id, cosmetic.icon, cosmeticTypes]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Wrapper
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link to={`/cosmetics/${cosmetic.id}`}>
        <Icon
          src={cosmeticPath}
          alt={cosmetic.name}
          loading={loading}
          onLoad={handleImageLoad}
          index={index}
        />
      </Link>
      <Tooltip show={showTooltip}>{useFormatName(cosmetic.name)}</Tooltip>
    </Wrapper>
  );
}
