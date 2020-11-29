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
      <img src={photoUrl} className="input-uploader__file" />
      <div className="input-uploader__field">
        <input
          style={inputStyle}
          id={inputID}
          type="file"
          onChange={onChangePhotoUrl}
          className="input-uploader__field-control"
        />
        <img src={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_get_app_black_18dp.png`} />
      </div>
    </div>
  );
};

export default UploadInput;
