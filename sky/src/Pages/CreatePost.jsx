import { useState, useEffect, useRef, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { convertBlobUrlToFile } from "../lib/utils";
import { uploadImage } from "../supabase/storageUpload";
import NavBar from "../Components/NavBar";
import { CosmeticsTagSearch } from "../Components/CosmeticsTagSearch";
import { ImageCarousel } from "../Components/ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Styles/page_css/CreatePostPage.css";

export default function CreatePost() {
  useEffect(() => {
    document.title = "Create Post";
  }, []);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 974px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 974px)")
      .addEventListener("change", (e) => setIsDesktop(e.matches));
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImageUrls]);
      console.log(newImageUrls);
    }
  };

  const clearImages = () => {
    setImageUrls([]);
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "posts_images",
        });

        if (error) {
          console.error(error);
          return;
        }

        urls.push(imageUrl);
      }

      console.log(urls);
      setImageUrls([]);
    });
  };
  return (
    <div>
      <NavBar page="createPostPage" />
      <div className="form-container">
        <input
          ref={imageInputRef}
          type="file"
          hidden
          multiple
          disabled={isPending}
          onChange={handleImageChange}
        />
        <div
          className={`post-creation-container ${
            isDesktop ? "desktop" : "mobile"
          }`}
        >
          <div
            onClick={
              imageUrls.length === 0
                ? () => imageInputRef.current?.click()
                : undefined
            }
            className="add-images"
          >
            <ImageCarousel
              items={imageUrls}
              pageContext={"postPage"}
            ></ImageCarousel>
            <FontAwesomeIcon
              style={{ display: imageUrls.length === 0 ? "none" : "block" }}
              onClick={imageUrls.length === 0 ? undefined : clearImages}
              className="x-icon"
              icon={faXmark}
            />
          </div>
          <div className="inputs-container">
            {/* title */}
            <div className="title-container">
              <span className="input-name">Title</span>
              <input
                type="text"
                className={`text-input ${isDesktop ? "desktop" : "mobile"}`}
              />
            </div>
            {/* body*/}
            <div className="body-container">
              <span className="input-name">Body</span>
              <textarea
                name=""
                id=""
                className={`textarea-input ${isDesktop ? "desktop" : "mobile"}`}
              ></textarea>
            </div>
            {/* tags */}
            <div className="title-container">
              <span className="input-name">Tags</span>
              <input
                type="text"
                className={`text-input ${isDesktop ? "desktop" : "mobile"}`}
              />
            </div>

            {/* tag cosmetics */}
            <div className="body-container">
              <span className="input-name">Tag Cosmetics</span>
              <button className="cosmetics-tag-button">Add Cosmetics</button>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={isPending}>
          upload
        </button>

        <CosmeticsTagSearch />
      </div>
    </div>
  );
}
