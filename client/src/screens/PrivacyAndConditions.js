import React, { useState, useEffect } from "react";

import { ApiService } from 'services/api.service';

const PrivacyAndConditionsScreen = () => {
    const [privacyText, setPrivacyText] = useState(null);

    useEffect(() => {
        ApiService.getPolicy()
            .then(data => {
                data.text()
                    .then(text => setPrivacyText(text))
            });
    }, []);

    return (
        <p dangerouslySetInnerHTML={ { __html: privacyText } }></p>
    );
};

export default PrivacyAndConditionsScreen;
