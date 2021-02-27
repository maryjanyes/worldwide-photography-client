import React from "react";

import { apiService } from "services/api.service";

const AboutAsPageScreen = () => {
    return (
        <frameset id='about-as'>
            <frame src={`${apiService.getAboutUsPage()}`}></frame>
        </frameset>
    );
}

export default AboutAsPageScreen;
