// import styled from "styled-components";
import "../Styles/components/closet.css";

//styles are in Styles/components/closet.css idk how to make em as styled components

export default function Closet({ cosmeticCategory, onClick, isSelected }) {
  const imageLink = `/img/closet_icons/${cosmeticCategory}.webp`;

  return (
    <div className="portal" onClick={onClick}>
      <div className="closet-type">
        <img
          className={`closet-image ${isSelected ? "glow" : ""}`}
          src={imageLink}
          alt={cosmeticCategory}
        />
      </div>
    </div>
  );
}
