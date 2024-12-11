import NavBar from "../Components/NavBar";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditPost() {
  useState(() => {
    document.title = "Edit Post";
  }, []);

  const postDetails = useLoaderData();
  const navigate = useNavigate();

  const CURRENT_USER = "0";
  const postUserID = postDetails.user_id;

  useEffect(() => {
    if (CURRENT_USER !== postUserID) {
      navigate("/blog");
    }
  }, [CURRENT_USER, postUserID, navigate]);

  let hasImage = postDetails.image ? true : false;

  const [title, setTitle] = useState(postDetails.title);
  const [body, setBody] = useState(postDetails.body);

  const submitPost = (event) => {
    event.preventDefault();

    const updatedFields = {};
    if (title !== postDetails.title) updatedFields.title = title;
    if (body !== postDetails.body) updatedFields.body = body;

    fetch(`http://localhost:3000/posts/${postDetails.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedFields),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Updated post:", json);
        navigate(`/blog/${postDetails.id}`);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form className="form" action="" onSubmit={submitPost}>
          <div className="input-container">
            {hasImage ? (
              <img
                style={{
                  width: "300px",
                  height: "auto",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
                src={`/img/${postDetails.image}` || ""}
                alt={postDetails.title}
              />
            ) : null}

            <input
              type="text"
              placeholder="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
              required
            />
            <textarea
              type="text"
              placeholder="say something cool!"
              onChange={(event) => {
                setBody(event.target.value);
              }}
              value={body}
              required
            />
          </div>
          <button className="post-button" type="submit">
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
}
