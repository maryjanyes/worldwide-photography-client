import React from 'react';

const UploadInput = ({ onChangePhotoUrl }) => <input id="contest-photo" type="file" style={{
    'margin-left': '18%',
    'margin-top': '1.2vh',
}} onChange={onChangePhotoUrl} />;

export default UploadInput;
