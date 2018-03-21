import { InputAction } from '../types';

export const handleChatInput = (text: string, author: string = 'User') => {
    return {
        type: InputAction.input,
        payload : {
            author: author, 
            text: text
        }
    };
};

export const handleBotChatOuput = (text: string) => {
    return {
        type: InputAction.input,
        payload: {
            author: 'Bot',
            text
        }
    };
};

export const clearChatOutput = () => ({type: InputAction.clear});