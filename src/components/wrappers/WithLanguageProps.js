import React from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from "utils/data.util";

const WithLanguageProps = (Component, trPropKeys = []) => {
  return (props) => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);

    const getTrProps = () => {
      const trProps = {};
      trPropKeys.forEach(key => {
        trProps[key] = translations[getTranslationStr(props[key], activeLanguage)];
      });
      return trProps;
    };

    return (
      <Component
        {...{
          ...props,
          ...getTrProps(),
        }}
      />
    );
  };
};

export default WithLanguageProps;
