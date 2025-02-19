import styled from "styled-components";
import { useState, useEffect } from "react";

import UserPost from "./UserPost";

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

export const DisplayPosts = ({ posts }) => {
  // Constants for resize function
  const RESIZE_TIMEOUT = 200;
  const COLUMN_DIVISION = 220;

  // Store number of columns based on window size
  const [columns, setColumns] = useState([]);

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
        distributePosts(posts, columnNum);
      }, RESIZE_TIMEOUT);
    };

    window.addEventListener("resize", handleResize);

    // Initial column distribution
    const initialColumnNum = Math.max(
      1,
      Math.floor(window.innerWidth / COLUMN_DIVISION)
    );
    distributePosts(posts, initialColumnNum);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [posts]);

  return (
    <Container>
      {columns.map((columnPosts, colIndex) => (
        <Column key={colIndex}>
          {columnPosts.map((post) => (
            <UserPost key={post.id} postInfo={post} />
          ))}
        </Column>
      ))}
    </Container>
  );
};
