import { useState } from "react";
import useFormatName from "../Hooks/formatName";

export const CosmeticTag = ({ icon, display, name, type, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (type.includes("props")) {
    type = "props";
  }

  const iconUrl = `/img/cosmetics/${type}_icons/${icon}`;

  console.log(iconUrl);
  const displayUrl = `/img/cosmetics/${type}_view/${display}`;
  const formattedName = useFormatName(name);

  return (
    <div
      className="cts-tag"
      style={{
        opacity: imageLoaded ? 1 : 0,
      }}
      onClick={onClick}
    >
      <div className="cts-images">
        <img
          className="cts-icon"
          src={iconUrl}
          alt={`${name} icon}`}
          onLoad={() => setImageLoaded(true)}
        />
        <img
          className="cts-display"
          src={displayUrl}
          alt={name}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <span className="cts-name">{formattedName}</span>
    </div>
  );
};
