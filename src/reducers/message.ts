import { Reducer, AnyAction } from 'redux';
import { MessageState, InputAction } from '../types';

// try not to make decisions you dont have to. 
const botMessage = {
    author: 'Bot', 
    text: `Welcome, 
    this is a work in progress DnD style bot, you can either type to
    interact or click, currently I respond to "pick up/drop[Item], exit [direction] & clear"`
};

const InitialState: MessageState = {conversationTopic: 'INIT', messageList: [botMessage]};

export const MessageReducer: Reducer<MessageState> = (
    state = InitialState, 
    action: AnyAction
) => {
    switch (action.type) {
        case InputAction.input:
            return  {conversationTopic: action.type, messageList: [...state.messageList, action.payload]};
        case InputAction.clear: 
            return InitialState;
        case 'MULTI_ITEM':
            let reply = `there are ${action.items.length} items matching ${action.items[0].name} which would you like?`;
            const msg = {author: 'bot', text: reply};
            return {conversationTopic: action.type, messageList: [...state.messageList, msg]};
        default:
            return state;
    }
};