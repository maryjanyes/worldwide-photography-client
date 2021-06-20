import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useModal from "use-react-modal";

import { getTranslationStr } from 'utils/data.util';
import footerLinks from 'mocks/footer-links';

import ChatView from "components/common/ChatView";
 
import { apiService } from "services/api.service";

const Foo = () => {
  const { translations, activeLanguage } = useSelector(({ ui }) => ui);
  const { ref: chatModalRef, openModal: openChatModal, closeModal: closeChatModal, Modal: ChatModal, isOpen: isChatModalOpen } = useModal();

  const openAction = actionName => {
    if (actionName === 'sendChatMessage') {
      openChatModal();
    } else { }
  };

  const actionRef = actionName => {
    if (actionName === 'sendChatMessage') {
      return chatModalRef;
    }
  };

  const actionIcon = actionName => {
    if (actionName === 'sendChatMessage') {
      return `${apiService.CLIENT_ENDPOINT}/assets/icons/chat-icon.png`;
    }
  };

  return (
    <React.Fragment>
      {isChatModalOpen && <ChatModal className="chat-view-modal">
        <ChatView close={closeChatModal} ref={chatModalRef} />
      </ChatModal>}
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
                      __link.isTapAction ?
                        <button ref={actionRef(__link.onTapActionName)} onClick={() => openAction(__link.onTapActionName)}>
                          <img src={actionIcon(__link.onTapActionName)} className="footer-links__link_icon" />
                        </button> :
                        <p>{__link.isPlaceholder && translations[getTranslationStr(__link.text, activeLanguage)] || __link.text}</p>
                    }
                  </li>)}
                </ul>
              </li>
            )
          })}
        </ul>
      </footer>
    </React.Fragment>
  );
};

export default Foo;
