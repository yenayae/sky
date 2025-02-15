import { useLoaderData } from "react-router-dom";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import COLORS from "../Styles/theme";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "../Styles/page_css/postDetails.css";

import { ImageCarousel } from "../Components/ImageCarousel";

import useLike from "../Hooks/useLike";

const PostDetails = () => {
  useState(() => {
    document.title = "Post Details";
  }, []);

  const postDetails = useLoaderData();

  console.log("postDetails", postDetails);
  console.log("post images array", postDetails.posts_images);

  //post details metadata
  const postID = postDetails.id;
  const imagesArray = postDetails.posts_images.map((image) => {
    return `https://epybsqrrtinvvbvqjnyt.supabase.co/${image.image_url}`;
  });
  console.log("imagesArray", imagesArray);
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
      <div className="post-details-container">
        <div className="post-details-box">
          <div className="post-container">
            <ImageCarousel items={imagesArray} pageContext={"postPage"} />
            <div className="text-details-box">
              <div
                style={{
                  margin: "10px",
                }}
              >
                <h1 className="post-details-title">{postDetails.title}</h1>
                <div className="post-details-user">
                  <img
                    className="post-details-pfp"
                    src="/img/default_pfp.jpg"
                    alt="profile picture"
                  />

                  <span className="username">username</span>
                </div>

                <div className="post-caption">
                  <p
                    style={{
                      margin: "0",
                    }}
                  >
                    {body}
                  </p>
                </div>
              </div>
              <div className="items-container">
                <FontAwesomeIcon
                  className="post-heart"
                  icon={faHeart}
                  color={isLiked ? "#d94e72" : "#cccccc"}
                  size="2x"
                  onClick={handleLikeToggle}
                />
                <div className="comment-container">
                  <textarea
                    className="comment-box"
                    type="text"
                    placeholder="Add a comment..."
                  />
                </div>
              </div>
            </div>
          </div>

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
