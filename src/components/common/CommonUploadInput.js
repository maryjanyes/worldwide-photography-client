import React from "react";

import { apiService } from "services/api.service";

const UploadInput = ({
  onChangePhotoUrl,
  containerStyle,
  inputStyle,
  inputID,
  photoUrl,
  fileName,
}) => {
  return (
    <div style={containerStyle} className="input-uploader">
      {fileName && <p className="input-uploader__selected">Selected image <br />{fileName}</p>}
      <img src={photoUrl} className="input-uploader__file site-image" />
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
