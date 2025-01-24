import "../Styles/temp.css";

export default function SubCategoryButton({ categoryName, onClick }) {
  return (
    <div>
      <button className="subButton" onClick={onClick}>
        {categoryName}
      </button>
    </div>
  );
}
