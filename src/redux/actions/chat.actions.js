export const setChatMessageType = Symbol('SET_CHAT_MESSAGE');
export const clearChatType = Symbol('CLEAR_CHAT');

export const setChatMessage = payload => ({
    type: setChatMessageType,
    payload,
});

export const clearChat = () => ({
    type: clearChatType,
});
