import React from "react";
import { useSelector } from "react-redux";

import ModalComponent from "components/common/CommonModal";

const ChatView = ({ close }) => {
    const { messages = [
        { text: 'some_message', admin: true },
        { text: 'some_message_2' }
    ] } = useSelector(({ chat = {} }) => chat);

    return (
        <ModalComponent closeModal={close}>
            {/** <div className="chat-messages">
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
            </div> **/}
            <div className="sorry-view">
                <span className="sorry-text">Chat in progress</span>
            </div>
        </ModalComponent>
    )
};

export default ChatView;
