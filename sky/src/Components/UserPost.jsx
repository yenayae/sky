import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../Styles/heartAnimation.css";
import { Link } from "react-router-dom";

import useLike from "../Hooks/useLike";

export default function UserPost({ postInfo }) {
  const imageLink = postInfo.image ? "img/" + postInfo.image : null;
  const title = postInfo.title;
  const caption = postInfo.body || "";
  const [isLiked, handleLikeToggle] = useLike(postInfo.id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        position: "relative",
        alignItems: "center",
      }}
      className="user-post"
      data-testid="user-post"
    >
      {imageLink ? (
        <div
          style={{
            borderRadius: "10px",
          }}
          className="post"
        >
          <Link to={`/blog/${postInfo.id}`} style={{ textDecoration: "none" }}>
            <img
              style={{
                width: "200px",
                height: "auto",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              src={imageLink}
              alt={postInfo.image}
            />
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 2px",
              width: "100%",
            }}
          >
            <Link
              to={`/blog/${postInfo.id}`}
              style={{ textDecoration: "none" }}
            >
              <span
                style={{
                  margin: "5px 0",
                  fontWeight: "500",
                  fontSize: ".9em",
                  color: "black",
                }}
              >
                {title}
              </span>
            </Link>
            <span className="hover-heart">
              <FontAwesomeIcon
                icon={faHeart}
                color={isLiked ? "#d94e72" : "#cccccc"}
                size="1x"
                onClick={handleLikeToggle}
                className="post-heart"
                data-testid="like-button"
              />
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "left",
            borderRadius: "10px",
            width: "200px",
            // border: "1px solid #e2e2e2",
            backgroundColor: "#eeebeb",
          }}
          // className="post"
        >
          <Link to={`/blog/${postInfo.id}`} style={{ textDecoration: "none" }}>
            <h2
              style={{
                margin: "5px",
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {title}
            </h2>
          </Link>

          <hr
            style={{
              width: "95%",
            }}
          />

          {caption && (
            <p
              style={{
                fontSize: ".9em",
                color: "#555",
                margin: "5px",
              }}
            >
              {caption}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "5px",
              paddingBottom: "5px",
            }}
          >
            <span className="hover-heart">
              <FontAwesomeIcon
                icon={faHeart}
                color={isLiked ? "#d94e72" : "#cccccc"}
                size="1x"
                onClick={handleLikeToggle}
                className="post-heart"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
