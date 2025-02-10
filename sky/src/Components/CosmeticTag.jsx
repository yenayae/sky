import useFormatName from "../Hooks/formatName";

export const CosmeticTag = ({ icon, display, name, type }) => {
  const iconUrl = `/img/cosmetics/${type}_icons/${icon}`;
  const displayUrl = `/img/cosmetics/${type}_view/${display}`;
  const formattedName = useFormatName(name);

  return (
    <div className="cts-tag">
      <div className="cts-images">
        <img className="cts-icon" src={iconUrl} alt="" />
        <img className="cts-display" src={displayUrl} alt={name} />
      </div>
      <span className="cts-name">{formattedName}</span>
    </div>
  );
};
