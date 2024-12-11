import UserPost from "../Components/UserPost";
import SearchBar from "../Components/SearchBar";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import { Link, useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../Styles/styles.css";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  height: 100%;
  min-width: 200px;
  margin: 5px;
`;

const Community = () => {
  useState(() => {
    document.title = "Community Blog";
  }, []);

  // Constants for resize function
  const RESIZE_TIMEOUT = 200;
  const COLUMN_DIVISION = 220;

  // Get posts from API
  const posts = useLoaderData();

  // Store number of columns based on window size
  const [columns, setColumns] = useState([]);

  // Search results
  const [searchResults, setSearchResults] = useState(posts);

  // Helper function to distribute posts into columns
  const distributePosts = (postList, columnNum) => {
    const columnsArray = Array.from({ length: columnNum }, () => []);
    postList.forEach((post, index) => {
      const columnIndex = index % columnNum;
      columnsArray[columnIndex].push(post);
    });
    setColumns(columnsArray);
  };

  //For resizing and distributing posts
  useEffect(() => {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const columnNum = Math.max(
          1,
          Math.floor(window.innerWidth / COLUMN_DIVISION)
        );
        distributePosts(searchResults, columnNum);
      }, RESIZE_TIMEOUT);
    };

    window.addEventListener("resize", handleResize);

    // Initial column distribution
    const initialColumnNum = Math.max(
      1,
      Math.floor(window.innerWidth / COLUMN_DIVISION)
    );
    distributePosts(searchResults, initialColumnNum);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [searchResults]);

  // Search by input
  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.title.replace(/_/g, " ").toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div>
      <NavBar page={"communityPage"} onSearch={handleSearch}></NavBar>
      <Container>
        {columns.map((columnPosts, colIndex) => (
          <Column key={colIndex}>
            {columnPosts.map((post) => (
              <UserPost key={post.id} postInfo={post} />
            ))}
          </Column>
        ))}
      </Container>
    </div>
  );
};

export default Community;
