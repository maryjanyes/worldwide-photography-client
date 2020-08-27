import React, { useState, useEffect } from "react";

import { apiService } from "services/api.service";
import { appLangs } from "services/app-configs.service";

const PrivacyAndConditionsScreen = () => {
  const [privacyText, setPrivacyText] = useState(null);

  const retreiveTextHead = (text) => text.match(/Privacy Policy/);

  useEffect(() => {
    apiService.getPrivacy(appLangs.EN).then((textData) => {
      setPrivacyText({
        head: retreiveTextHead(textData) || "",
        text: textData,
      });
    });
  }, []);

  return (
    (privacyText && (
      <div className="privacy-and-conditions-page">
        <h3>{privacyText.head[0]}</h3>
        <p dangerouslySetInnerHTML={{ __html: privacyText.text }}></p>
      </div>
    )) || <div></div>
  );
};

export default PrivacyAndConditionsScreen;
