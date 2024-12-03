import UserPost from "../Components/UserPost";
import SearchBar from "../Components/SearchBar";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import { Link, useLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Container = styled.div`
  // background-color: orange;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  // background-color: pink;
  height: 100%;
  min-width: 200px;
  margin: 10px;
`;

const Header = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
`;

const Community = () => {
  const posts = useLoaderData();
  const RESIZE_TIMEOUT = 200;
  const COLUMN_DIVISION = 215;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [columns, setColumns] = useState([]);

  /* 
  window resize function:
  once the user doesn't resize window for RESIZE_TIMEOUT ms,
  calcuale columnNum by windowsize/COLUMN_DIVISION
  redo layout with columnNum number of columns
  distribute posts accordingly (use post id as order)
  */
  useEffect(() => {
    let resizeTimeout;

    const distributePosts = (columnNum) => {
      // initialize empty arrays for each column
      const columnsArray = Array.from({ length: columnNum }, () => []);

      posts.forEach((post, index) => {
        // distribute posts based on their index
        const columnIndex = index % columnNum;
        columnsArray[columnIndex].push(post);
      });
      setColumns(columnsArray);
    };

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const columnNum = Math.max(
          1,
          Math.floor(window.innerWidth / COLUMN_DIVISION)
        );
        distributePosts(columnNum);
      }, RESIZE_TIMEOUT);
    };

    window.addEventListener("resize", handleResize);

    // initial column distribution
    const initialColumnNum = Math.max(
      1,
      Math.floor(window.innerWidth / COLUMN_DIVISION)
    );
    distributePosts(initialColumnNum);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [posts]);

  return (
    <div>
      <NavBar></NavBar>
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
