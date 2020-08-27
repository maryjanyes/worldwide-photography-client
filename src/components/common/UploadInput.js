import React from "react";

const UploadInput = ({ onChangePhotoUrl, containerStyle, inputStyle }) => {
  return (
    <div style={containerStyle}>
      <input
        style={inputStyle}
        id="contest-photo"
        type="file"
        onChange={onChangePhotoUrl}
      />
    </div>
  );
};

export default UploadInput;
