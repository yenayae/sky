import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import COLORS from "../Styles/theme";
import "../Styles/styles.css";

import { useEffect, useState } from "react";

const SearchForm = styled.form`
  flex: 1;
  background-color: ${COLORS.secondary};
  padding: 0 20px;
  display: flex;
  height: 100%;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  background-color: ${COLORS.secondary};
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;

  &:focus {
    outline: none;
    border: none;
  }
`;

export default function NavBar({ page, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldReload, setShouldReload] = useState(false);

  const handleClick = () => {
    navigate("/cosmetics", { replace: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value.trim();
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
        <button
          className="nav-button"
          onClick={handleClick}
          data-testid="cosmetics-button"
        >
          Cosmetics
        </button>
        <SearchForm className="search-form" onSubmit={handleSearch}>
          <SearchInput
            className="search-bar"
            name="searchInput"
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
          <button type="submit" style={{ display: "none" }}>
            Submit
          </button>
        </SearchForm>
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
