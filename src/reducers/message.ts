import { Reducer, AnyAction } from 'redux';
import { MessageState, InputAction } from '../types';

// try not to make decisions you dont have to. 
const botMessage = {
    author: 'bot', 
    text: `Hi, Welcome to the DnD bot, 
    a work in progress, you can either type to
    interact or click, currently I respond to "pick up/drop[Item], exit [direction]"`
};

const InitialState: MessageState = [botMessage]

export const MessageReducer: Reducer<MessageState> = (
    state = InitialState, 
    action: AnyAction
) => {
    switch (action.type) {
        case InputAction.userInput:
            return  [...state, action.payload];
        case InputAction.clear: 
            return InitialState;    
        default:
            return state;
    }
};