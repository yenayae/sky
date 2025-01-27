import "../Styles/styles.css";
import styled from "styled-components";

const SubButton = styled.button`
  cursor: pointer;
  height: auto;
  width: 150px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-bottom: 5px solid rgba(20, 18, 14, 0);
  background: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(20, 18, 14, 0.5);
    color: white;
  }
`;

const SubButtonImg = styled.img`
  height: 45px;
`;

export default function SubCategoryButton({
  categoryName,
  onClick,
  isSelected,
}) {
  return (
    <div>
      <SubButton
        className={`${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        <SubButtonImg
          src={`/img/closet_icons/subcategories/${categoryName}_icon.png`}
          alt={`${categoryName} icon`}
        />
      </SubButton>
    </div>
  );
}
