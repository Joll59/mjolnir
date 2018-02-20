import { Reducer, AnyAction } from 'redux';
import { MessageState, actionTypes } from '../types';

// try not to make decisions you dont have to. 
const botMessage = {
    author: 'bot', 
    text: 'Hi'
};

const InitialState: MessageState = {
    description: '', 
    messageList: [
        botMessage
    ]
};

export const MessageReducer: Reducer<MessageState> = (
    state = InitialState, 
    action: AnyAction
) => {
    switch (action.type) {
        case actionTypes.userInput:
            return {
                ...state, 
                description: action.payload.text,
                messageList: [
                    ...state.messageList, 
                    action.payload
                ]
            };
        default:
            return state;
    }
};

// export default clickReducer;