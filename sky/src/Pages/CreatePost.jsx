import NavBar from "../Components/NavBar";
import "../Styles/page_css/CreatePostPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreatePost() {
  useState(() => {
    document.title = "Create Post";
  }, []);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const submitPost = (event) => {
    event.preventDefault();

    // Creating a post
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        user_id: "0",
        image: image,
        likes: 0,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        navigate("/blog");
      });
  };

  return (
    <div>
      <NavBar page="createPostPage" />
      <div className="form-container">
        <form className="form" action="" onSubmit={submitPost}>
          <div className="input-container">
            <input
              type="text"
              placeholder="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              required
            />
            <textarea
              type="text"
              placeholder="say something cool!"
              onChange={(event) => {
                setBody(event.target.value);
              }}
              required
            />
          </div>
          <button className="post-button" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
