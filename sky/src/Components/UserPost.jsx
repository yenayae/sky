export default function UserPost(postInfo) {
  const imageLink = "img/" + postInfo.postInfo.image;
  const title = postInfo.postInfo.title;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <img
        style={{
          width: "200px",
          height: "auto",
          borderRadius: "10px",
        }}
        src={imageLink}
        alt={title}
      />

      <span
        style={{
          margin: "5px 0",
          fontWeight: "500",
          fontSize: ".9em",
        }}
      >
        {title}
      </span>
    </div>
  );
}
