import React from "react";
import { useSelector } from "react-redux";

import { appLangs } from "services/app-configs.service";

const WithLanguageProps = (Component) => {
  return (props) => {
    const { activeLanguage } = useSelector(({ ui }) => ui);

    const originProps = {
      description:
        activeLanguage === appLangs.EN
          ? props.en_description
          : props.ua_description,
      name: activeLanguage === appLangs.EN ? props.en_name : props.ua_name,
    };
    return <Component {...{ ...props, ...originProps }} />;
  };
};

export default WithLanguageProps;
