import { setChatMessageType, clearChatType } from '../actions/chat.actions';

const initialState = {
    messages: [],
};

export default function ChatReducer(state = initialState, { payload, type }) {
    switch (type) {
        case setChatMessageType: {
            return {
                ...state,
                messages: [...state.messages, payload],
            };
        }
        case clearChatType: {
            return {
                ...state,
                messages: [],
            };
        }
        default: {
            return state;
        }
    }
}