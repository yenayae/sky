import styled from "styled-components";

const CosmeticType = styled.div`
  // background-color: rgba(20, 18, 14, 0.5);
  height: auto;
  width: 40px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: white;
`;

const Portal = styled.div`
  // background-color: rgba(20, 18, 14, 0.5);
  height: 300px;
  width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Closet({ cosmeticCategory, onClick }) {
  const imageLink = `/img/closet_icons/${cosmeticCategory}.webp`;

  return (
    <Portal onClick={onClick}>
      <CosmeticType>
        <img
          style={{
            height: "100%",
            width: "100%",
          }}
          src={imageLink}
          alt={cosmeticCategory}
        />
      </CosmeticType>
    </Portal>
  );
}
