import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { supabase } from "./supabase/supabaseClient";
import Community from "./Pages/Community";
import Home from "./Pages/Home";
import PostDetails from "./Pages/PostDetails";
import Cosmetics from "./Pages/Cosmetics";
import CosmeticDetails from "./Pages/CosmeticDetails";
import ContactPage from "./Pages/ContactPage";
import SubmissionPage from "./Pages/SubmissionPage";
import CreatePost from "./Pages/CreatePost";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserProfile from "./Pages/UserProfile";
import EditPost from "./Pages/EditPost";
import LikedPosts from "./Pages/LikedPosts";

import { AuthProvider } from "./Hooks/authContext";

const cosmeticsLoader = async () => {
  const { data, error } = await supabase
    .from("cosmetics")
    .select(
      `
      *,
      cosmetic_types(id, parent_type)
    `
    )
    .limit(150);

  if (error) {
    throw new Error("Error fetching cosmetics: " + error.message);
  }

  return data;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  // {
  //   path: "/app",
  //   element: <App />,
  // },

  // {
  //   path: "/contact",
  //   element: <ContactPage />,
  // },

  // {
  //   path: "/success",
  //   element: <SubmissionPage />,
  // },

  {
    path: "/createPost",
    element: <CreatePost />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/profile/:username",
    element: <UserProfile />,
    loader: async ({ params }) => {
      const { data, error } = await supabase
        .from("users")
        .select("*, posts(*, posts_images(image_url))")
        .eq("username", params.username)
        .single();

      if (error) {
        throw new Response("User not found", { status: 404 });
      }

      return data;
    },
  },

  {
    path: "/passwordReset",
    element: <Signup />,
  },

  {
    path: "/cosmetics",
    element: <Cosmetics />,
    loader: cosmeticsLoader,
  },
  {
    path: "/cosmetics/:id",
    element: <CosmeticDetails />,
    loader: async ({ params }) => {
      const { data, error } = await supabase
        .from("cosmetics")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        throw new Response("Cosmetic not found", { status: 404 });
      }

      return data;
    },
  },
  {
    path: "/blog",
    element: <Community />,
    loader: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, posts_images(image_url)")
        .eq("posts_images.is_thumbnail", true)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        throw new Response("Cosmetic not found", { status: 404 });
      }

      return data;
    },
  },

  {
    path: "/blog/:id",
    element: <PostDetails />,
    loader: async ({ params }) => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, posts_images(image_url)")
        .eq("id", params.id)
        .single();

      if (error) {
        throw new Response("Cosmetic not found", { status: 404 });
      }

      return data;
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
