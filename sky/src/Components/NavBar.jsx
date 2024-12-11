import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import COLORS from "../Styles/theme";
import "../Styles/styles.css";

const SearchInput = styled.input`
  background-color: ${COLORS.secondary};
  // width: 90%;
  height: 100%;
  border: none;
  border-radius: 20px;
  margin: 0 2px;
  padding: 0 10px;
  flex-grow: 1;
`;

export default function NavBar({ page, onSearch }) {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const CURRENT_USER = "0";

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          width: "100%",
        }}
      >
        <Link to="/" style={{ height: "100%" }}>
          <button className="nav-button" data-testid="home-button">
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
        <Link to="/blog" style={{ height: "100%" }}>
          <button className="nav-button" data-testid="community-button">
            Community
          </button>
        </Link>
        <Link to="/cosmetics" style={{ height: "100%" }}>
          <button className="nav-button" data-testid="cosmetics-button">
            Cosmetics
          </button>
        </Link>
        <SearchInput
          onChange={handleSearchChange}
          type="text"
          placeholder={
            page === "communityPage"
              ? "Search posts..."
              : page === "cosmeticPage"
              ? "Search cosmetics..."
              : "Search..."
          }
          data-testid="searchBar"
        />
        <Link to="/createPost" style={{ height: "100%" }}>
          <button className="nav-button" data-testid="post-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
        <Link to={`/likedPosts/${CURRENT_USER}`} style={{ height: "100%" }}>
          <button className="nav-button" data-testid="likedPosts-button">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </Link>
      </div>
    </div>
  );
}
