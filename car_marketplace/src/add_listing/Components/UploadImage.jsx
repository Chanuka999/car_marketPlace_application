import React from "react";

const UploadImage = () => {
  return (
    <div>
      <diV>
        <label htmlFor="upload-images"></label>
        <input
          type="file"
          multiple={true}
          id="upload-image"
          className="opacity-0"
        />
      </diV>
    </div>
  );
};

export default UploadImage;
