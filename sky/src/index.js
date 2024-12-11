import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Community from "./Pages/Community";
import Home from "./Pages/Home";
import PostDetails from "./Pages/PostDetails";
import Cosmetics from "./Pages/Cosmetics";
import CosmeticDetails from "./Pages/CosmeticDetails";
import ContactPage from "./Pages/ContactPage";
import SubmissionPage from "./Pages/SubmissionPage";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import LikedPosts from "./Pages/LikedPosts";

const SERVER = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/app",
    element: <App />,
  },

  {
    path: "/contact",
    element: <ContactPage />,
  },

  {
    path: "/success",
    element: <SubmissionPage />,
  },

  {
    path: "/createPost",
    element: <CreatePost />,
  },

  {
    path: "/editPost/:id",
    element: <EditPost />,
    loader({ params }) {
      return fetch(`${SERVER}/posts/${params.id}`).then((response) => {
        return response.json();
      });
    },
  },

  {
    path: "/likedPosts/:id",
    element: <LikedPosts />,
    loader({ params }) {
      return fetch(`${SERVER}/likedPosts?user_id=${params.id}`).then(
        (response) => {
          return response.json();
        }
      );
    },
  },

  {
    path: "/cosmetics",
    element: <Cosmetics />,
    loader() {
      return fetch(SERVER + "/cosmetics").then((response) => {
        return response.json();
      });
    },
  },
  {
    path: "/cosmetics/:id",
    element: <CosmeticDetails />,
    loader({ params }) {
      return fetch(`${SERVER}/cosmetics/${params.id}`).then((response) => {
        if (!response.ok) {
          throw new Response("Cosmetic not found", { status: 404 });
        }
        return response.json();
      });
    },
  },
  {
    path: "/blog",
    element: <Community />,
    loader() {
      return fetch(SERVER + "/posts").then((response) => {
        return response.json();
      });
    },
  },

  {
    path: "/blog/:id",
    element: <PostDetails />,
    loader({ params }) {
      return fetch(`${SERVER}/posts/${params.id}`).then((response) => {
        if (!response.ok) {
          throw new Response("Post not found", { status: 404 });
        }
        return response.json();
      });
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
