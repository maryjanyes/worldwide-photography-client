import React from "react";
import { useSelector } from "react-redux";

import ModalComponent from "components/common/CommonModal";

// TODO: Update the chat view
const ChatView = ({ close }) => {
    const { messages } = useSelector(({ chat }) => chat);

    return (
        <ModalComponent closeModal={close}>
            <span>Get in progress</span>
            {/** <div className="modal-chat-messages">
                <div className="chat-messages">
                    {messages.map(message => {
                        return (
                            <div className={`chat-messages__message ${message.admin && 'admin-message' || 'client-message'}`} key={message.id}>
                                <span>{message?.text}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="chat-send-area">
                    <input type="text" placeholder="Send message" />
                </div>
                <div className="sorry-view"></div>
                </div> **/}
        </ModalComponent>
    )
};

export default ChatView;
