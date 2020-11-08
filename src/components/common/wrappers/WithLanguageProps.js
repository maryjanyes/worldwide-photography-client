import React from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from "../../../utils/data.util";

const WithLanguageProps = (Component) => {
  return (props) => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);

    const originProps = {
      description:
        translations[getTranslationStr(props.description, activeLanguage)],
      name: translations[getTranslationStr(props.name, activeLanguage)],
    };
    return (
      <Component
        {...{
          ...props,
          ...originProps,
        }}
      />
    );
  };
};

export default WithLanguageProps;
