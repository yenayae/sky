// useLike.js
import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "./authContext";

const useLike = (postID) => {
  const { user } = useAuth();
  const currentUserID = user?.id;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      const { data, error } = await supabase
        .from("liked_posts")
        .select("id")
        .eq("post_id", postID)
        .eq("user_id", currentUserID)
        .maybeSingle(); // Ensures only one result is fetched

      if (error) {
        console.error("Error fetching liked status:", error);
      }
      setIsLiked(!!data); // If data exists, set isLiked to true
    };

    checkIfLiked();
  }, [postID, currentUserID]);

  const handleLikeToggle = async () => {
    if (isLiked) {
      // Remove like
      const { data, error } = await supabase
        .from("liked_posts")
        .select("id")
        .eq("post_id", postID)
        .eq("user_id", currentUserID)
        .single();

      if (error) {
        console.error("Error finding like entry:", error);
        return;
      }

      if (data) {
        const { error: deleteError } = await supabase
          .from("liked_posts")
          .delete()
          .eq("id", data.id);

        if (deleteError) {
          console.error("Error removing like:", deleteError);
        } else {
          setIsLiked(false);
        }
      }
    } else {
      // Add like
      const { error } = await supabase.from("liked_posts").insert([
        {
          post_id: postID,
          user_id: currentUserID,
        },
      ]);

      if (error) {
        console.error("Error adding like:", error);
      } else {
        setIsLiked(true);
      }
    }
  };

  return [isLiked, handleLikeToggle];
};

export default useLike;
