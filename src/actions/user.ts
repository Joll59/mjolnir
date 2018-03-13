import { InputAction, InputAction$ } from '../types';

export const handleUserChatInput = (text: string) => {
    return {
        type: InputAction.userInput,
        payload : {
            author: 'User', 
            text: text
        }
    };
};

export const handleBotChatOuput = (text: string):  InputAction$ => {
    return {
        type: InputAction.userInput,
        payload: {
            author: 'Bot',
            text
        }
    };
};