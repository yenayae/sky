// useLike.js
import { useState, useEffect } from "react";

const useLike = (postID, currentUserID = "0") => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if the post is already liked by the current user
    fetch(
      `http://localhost:3000/likedPosts?post_id=${postID}&user_id=${currentUserID}`
    )
      .then((response) => response.json())
      .then((data) => {
        // If the post is liked, set the state to true
        if (data.length !== 0) {
          setIsLiked(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [postID, currentUserID]);

  const handleLikeToggle = () => {
    if (isLiked) {
      // Remove like: see if entry exists to extract id, then delete it
      fetch(
        `http://localhost:3000/likedPosts?post_id=${postID}&user_id=${currentUserID}`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          const likedPostId = data[0].id;
          fetch(`http://localhost:3000/likedPosts/${likedPostId}`, {
            method: "DELETE",
          }).then((response) => {
            if (response.ok) {
              setIsLiked(false);
            } else {
              console.error("Failed to remove like");
            }
          });
        })
        .catch((error) => console.error("Error:", error));
    } else {
      // Check if the like already exists before adding it
      fetch(
        `http://localhost:3000/likedPosts?post_id=${postID}&user_id=${currentUserID}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            // Add like if it doesn't already exist
            fetch(`http://localhost:3000/likedPosts`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                post_id: postID,
                user_id: currentUserID,
                date_liked: new Date().toISOString(),
              }),
            }).then((response) => {
              if (response.ok) {
                setIsLiked(true);
              } else {
                console.error("Failed to add like");
              }
            });
          } else {
            console.log("Like already exists.");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return [isLiked, handleLikeToggle];
};

export default useLike;
