import React, { useState, useEffect } from "react";

import { ApiService } from 'services/api.service';

const PrivacyAndConditionsScreen = () => {
    const [privacyText, setPrivacyText] = useState(null);

    const retreiveTextHead = text => text.match(/Privacy Policy/);

    useEffect(() => {
        ApiService.getPolicy()
            .then(data => {
                data.text().then(text => {
                    setPrivacyText({
                        head: retreiveTextHead(text),
                        text: text,
                    });
                });
            });
    }, []);

    return privacyText && (
        <div className="privacy-and-conditions-page">
            <h3>{privacyText.head[0]}</h3>
            <p dangerouslySetInnerHTML={ { __html: privacyText.text } }></p>
        </div>
    ) || <div></div>;
};

export default PrivacyAndConditionsScreen;
