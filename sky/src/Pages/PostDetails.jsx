import { useLoaderData } from "react-router-dom";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import COLORS from "../Styles/theme";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import useLike from "../Hooks/useLike";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContainer = styled.div`
  border: 1px solid ${COLORS.secondary};
  margin: 10px;
  display: flex;
  flex-direction: row;
  max-width: 600px;
  border-radius: 3px;
`;

const PostImage = styled.img`
  width: 60%;
  height: auto;
`;

const PostCaption = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const UserProfile = styled.img`
  width: 30px%;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostTitle = styled.h1`
  margin: 0;
  font-size: 1.8em;
`;

const PostDetails = () => {
  useState(() => {
    document.title = "Post Details";
  }, []);

  const postDetails = useLoaderData();

  //post details metadata
  const postID = postDetails.id;
  const imageLink = "/img/" + postDetails.image;
  const title = postDetails.title;
  const body = postDetails.body;
  const likes = postDetails.likes;

  //check if liked by getting current userID
  let CURRENT_USER = "0";
  const [isLiked, handleLikeToggle] = useLike(postID);

  //check editing perms
  let isPostOwner = false;
  let postUserID = postDetails.user_id;
  if (CURRENT_USER === postUserID) {
    isPostOwner = true;
  }

  return (
    <div>
      <NavBar></NavBar>
      <div
        style={{
          // backgroundColor: "lightblue",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <PostContainer>
            <PostImage src={imageLink} alt={postDetails.image} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <div
                style={{
                  margin: "10px",
                }}
              >
                <PostTitle>{postDetails.title}</PostTitle>
                <PostCaption>
                  <UserProfile
                    src="/img/default_pfp.jpg"
                    alt="profile picture"
                  />
                  <p
                    style={{
                      margin: "0",
                    }}
                  >
                    {body}
                  </p>
                </PostCaption>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "10px",
                  // backgroundColor: "#f2f2f2",
                }}
              >
                <FontAwesomeIcon
                  className="post-heart"
                  icon={faHeart}
                  color={isLiked ? "#d94e72" : "#cccccc"}
                  size="2x"
                  onClick={handleLikeToggle}
                />

                {/* <textarea
                  style={{
                    width: "99%",
                    height: "30px",
                    borderRadius: "3px",
                    border: "none",
                    padding: "5px 10px",
                  }}
                  type="text"
                  placeholder="Add a comment..."
                /> */}
              </div>
            </div>
          </PostContainer>

          {isPostOwner ? (
            <Link to={`/editPost/${postID}`}>
              <button
                style={{
                  marginRight: "10px",
                }}
                className="contact-button"
              >
                edit post
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
