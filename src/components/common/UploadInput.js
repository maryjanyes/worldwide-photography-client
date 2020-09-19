import React from "react";

import { apiService } from "services/api.service";

const UploadInput = ({
  onChangePhotoUrl,
  containerStyle,
  inputStyle,
  inputID,
}) => {
  return (
    <div style={containerStyle} className="input-upload-container">
      <input
        style={inputStyle}
        id={inputID}
        type="file"
        onChange={onChangePhotoUrl}
      />
      <img
        src={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_get_app_black_18dp.png`}
      />
    </div>
  );
};

export default UploadInput;
