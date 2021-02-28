import React, { useEffect } from "react";

import { apiService } from "services/api.service";

const AboutAsPageScreen = () => {

    useEffect(() => {
        document.querySelector('.app-wrapper').className = '';
        return () => document.querySelector('#app-wrapper').className = 'app-wrapper';
    }, [])

    return (
        <frameset id="page page-about-as">
            <frame src={`${apiService.getAboutUsPage()}`}></frame>
        </frameset>
    );
}

export default AboutAsPageScreen;
