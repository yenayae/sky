import { useAuth } from "../Hooks/authContext";
import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";

import Logout from "../Components/LogOut";
import NavBar from "../Components/NavBar";
import { DisplayPosts } from "../Components/DisplayPosts";

import "../Styles/page_css/userProfilePage.css";

export default function UserProfile() {
  const userInfo = useLoaderData();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [contentTabSelected, setContentTabSelected] = useState("posts");
  const [posts, setPosts] = useState([]);

  if (!user) {
    navigate("/login");
    return null;
  }

  console.log(userInfo);

  return (
    <div>
      <NavBar />
      <div>
        <div className="profile-header">
          <div className="profile-user-info">
            <img className="profile-image" src="/img/assets/kiry.png" alt="" />
            <div className="profile-user-details">
              <div>
                <h1 className="profile-username">{user.username}</h1>
              </div>
              <div className="profile-followers">
                <span>NUM followers</span>
                <span>NUM following</span>
              </div>
            </div>
          </div>
          <Logout />
        </div>

        <div className="profile-content-container">
          <div className="profile-content-header">
            <span
              className={`profile-content-tab ${
                contentTabSelected === "posts" && "selected"
              }`}
              onClick={() => setContentTabSelected("posts")}
            >
              Posts
            </span>
            <span
              className={`profile-content-tab ${
                contentTabSelected === "likes" && "selected"
              }`}
              onClick={() => setContentTabSelected("likes")}
            >
              Likes
            </span>
          </div>

          <div className="profile-content">
            {contentTabSelected === "posts" && (
              <div>
                <DisplayPosts posts={userInfo.posts} />
              </div>
            )}
            {contentTabSelected === "likes" && <div> liked posts </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
