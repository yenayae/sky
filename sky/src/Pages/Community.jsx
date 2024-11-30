import UserPost from "../Components/UserPost";
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
  background-color: pink;
  height: 100%;
  min-width: 200px;
  margin: 10px;
`;

const Community = () => {
  const posts = useLoaderData();
  // console.log(posts);

  //screen width handling
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1>Community</h1>
      <Container>
        <Column>
          {posts.map((post, index) => {
            return <UserPost key={index} postInfo={post} />;
          })}
        </Column>
        <Column></Column>
      </Container>
    </div>
  );
};

export default Community;
