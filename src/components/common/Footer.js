import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTranslationStr } from 'utils/data.util';
import footerLinks from 'mocks/footer-links';

const Foo = () => {
  const { translations, activeLanguage } = useSelector(({ ui }) => ui);

  return (
    <footer className="footer">
      <ul className="footer-links">
        {footerLinks.map(_link => {
          return (
            <li className="footer-links__link" key={_link.title}>
              <p className="footer-links__links__level2_title">{translations[getTranslationStr(_link.title, activeLanguage)]}</p>
              <ul className="footer-links__links__level2">
                {_link.blocks.map(__link => <li className="footer-links__link__level2" key={__link.text}>
                  {__link.to ?
                    <Link to={__link.to}>{__link.isPlaceholder && translations[getTranslationStr(__link.text, activeLanguage)] || __link.text}</Link> :
                    <p>{__link.isPlaceholder && translations[getTranslationStr(__link.text, activeLanguage)] || __link.text}</p>
                  }
                </li>)}
              </ul>
            </li>
          )
        })}
      </ul>
    </footer>
  );
};

export default Foo;
