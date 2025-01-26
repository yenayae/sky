import "../Styles/temp.css";

export default function SubCategoryButton({
  categoryName,
  onClick,
  isSelected,
}) {
  return (
    <div>
      <button
        className={`subButton ${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        <img
          className="subButtonImg"
          src={`/img/closet_icons/subcategories/${categoryName}_icon.png`}
          alt={`${categoryName} icon`}
        />
      </button>
    </div>
  );
}
