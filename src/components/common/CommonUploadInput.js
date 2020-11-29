import React from "react";

import { apiService } from "services/api.service";

const UploadInput = ({
  onChangePhotoUrl,
  containerStyle,
  inputStyle,
  inputID,
  photoUrl,
}) => {
  return (
    <div style={containerStyle} className="input-uploader">
      <img src={photoUrl} className="input-uploader-file" />
      <input
        style={inputStyle}
        id={inputID}
        type="file"
        onChange={onChangePhotoUrl}
        className="input-uploader-field"
      />
      <img src={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_get_app_black_18dp.png`} />
    </div>
  );
};

export default UploadInput;
