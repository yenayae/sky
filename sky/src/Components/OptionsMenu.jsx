import React from "react";

const OptionsMenu = React.memo(
  ({ handleEdit, handleReport, handleDownload }) => (
    <div className="options-menu">
      <span className="options-item" onClick={handleEdit}>
        Edit post
      </span>
      <span className="options-item" onClick={handleReport}>
        Report post
      </span>
      <span className="options-item" onClick={handleDownload}>
        Download image
      </span>
    </div>
  )
);

export default OptionsMenu;
