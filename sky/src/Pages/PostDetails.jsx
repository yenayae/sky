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
import { useAuth } from "../Hooks/authContext";

const PostDetails = () => {
  const { user } = useAuth();

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

  //check if liked by getting current userID
  const [isLiked, handleLikeToggle, isProcessing] = useLike(postID);
  const [likes, setLikes] = useState(postDetails.likes);
  const [isLikedUI, setIsLikedUI] = useState(isLiked);

  useEffect(() => {
    setIsLikedUI(isLiked);
  }, [isLiked]);

  //check editing perms

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

  const handleLike = () => {
    if (isProcessing) return;

    // optimistically update ui
    setIsLikedUI((prev) => !prev);
    setLikes((prevLikes) => (isLikedUI ? prevLikes - 1 : prevLikes + 1));

    // call async handler
    handleLikeToggle().catch((error) => {
      console.error(error);
      setIsLikedUI(isLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
    });
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

                  <span className="username">{postDetails.users.username}</span>
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
                    className="post-options-menu"
                    showOptionsMenu={showOptionsMenu} // Toggle menu visibility
                    options={[
                      { label: "Download image", action: handleDownload },
                      { label: "Report post", action: handleReport },
                      ...(user?.id === postDetails.user_id
                        ? [
                            { label: "Edit post", action: handleEdit },
                            { label: "Delete post", action: handleDelete },
                          ]
                        : []),
                    ]}
                    pageContext={"post-details"}
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
                      color={isLikedUI ? "#d94e72" : "#cccccc"}
                      // size="2x"
                      onClick={handleLike}
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
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
