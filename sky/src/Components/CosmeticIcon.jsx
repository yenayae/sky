import { Link } from "react-router-dom";
import styled from "styled-components";

const Icon = styled.img`
  background-color: rgba(20, 18, 14, 0.5);
  height: 70px;
  width: 70px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  transition: 0.3s;

  }


  &:hover {
    background-color: rgba(20, 18, 14, 0.7);
  }


`;

export default function CosmeticIcon({ cosmetic }) {
  let COSMETIC_PATH;
  if (cosmetic.type_id == 1) {
    COSMETIC_PATH = "outfit_icons/";
  }

  const iconLink = "/img/cosmetics/" + COSMETIC_PATH + cosmetic.icon;
  // console.log(iconLink);

  return (
    <Link to={`/cosmetics/${cosmetic.id}`}>
      <Icon src={iconLink} alt={cosmetic.name} />
    </Link>
  );
}
