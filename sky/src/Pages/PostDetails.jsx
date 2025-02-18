import { useLoaderData } from "react-router-dom";
import NavBar from "../Components/NavBar";
import OptionsMenu from "../Components/OptionsMenu";
import styled from "styled-components";
import COLORS from "../Styles/theme";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "../Styles/page_css/postDetails.css";

import { ImageCarousel } from "../Components/ImageCarousel";

import useLike from "../Hooks/useLike";

const PostDetails = () => {
  useEffect(() => {
    document.title = "Post Details";
  }, []);

  const postDetails = useLoaderData();

  console.log(postDetails);

  //post details metadata
  const postID = postDetails.id;
  const imagesArray = postDetails.posts_images.map((image) => {
    return `https://epybsqrrtinvvbvqjnyt.supabase.co/${image.image_url}`;
  });
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

  //options menu functions
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const toggleMenu = () => {
    console.log("toggle menu!");
    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleDelete = () => {
    console.log("delete post!");
  };

  const handleEdit = () => {
    console.log("edit post!");
  };

  const handleDownload = () => {
    console.log("download image!");
  };

  const handleReport = () => {
    console.log("report post!");
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="post-details-container">
        <div className="post-details-box">
          <div className="post-container">
            {imagesArray.length > 0 && (
              <ImageCarousel items={imagesArray} pageContext={"postPage"} />
            )}

            <div
              className="text-details-box"
              style={{
                width: imagesArray.length > 0 ? "300px" : "550px",
              }}
            >
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
                {showOptionsMenu && (
                  <OptionsMenu
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleReport={handleReport}
                    handleDownload={handleDownload}
                  />
                )}

                <div className="items-details">
                  <span className="num-likes">
                    {likes} {likes === 1 ? "like" : "likes"}
                  </span>
                  <div className="icons-container">
                    <FontAwesomeIcon
                      className="post-heart postDetails-heart"
                      icon={faHeart}
                      color={isLiked ? "#d94e72" : "#cccccc"}
                      // size="2x"
                      onClick={handleLikeToggle}
                    />

                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="post-options"
                      onClick={toggleMenu}
                      style={{
                        backgroundColor: showOptionsMenu
                          ? "rgb(182, 182, 182)"
                          : "transparent",
                        color: showOptionsMenu ? "white" : "#b3b3b3",
                      }}
                    />
                  </div>
                </div>
                <div className="comment-container">
                  <textarea
                    className="comment-box"
                    type="text"
                    placeholder="Add a comment..."
                    style={{
                      width: imagesArray.length > 0 ? "258px" : "508px",
                    }}
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
