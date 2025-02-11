export const CosmeticCarouselItem = ({ item, width, cosmeticType }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      <div></div>
      <img
        key={item.id}
        src={`/img/cosmetics/${cosmeticType}_view/${item.image_url}`}
        alt={item.alt_caption}
        className="carousel-img"
      />
    </div>
  );
};
