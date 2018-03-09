import { userInputAction } from '../types';

export const handleUserChatInput = (text: string) => {
    return {
        type: userInputAction.userInput,
        payload : {
            author: 'User', 
            text: text
        }
    };
};

export const handleBotChatOuput = (text: string) => {
    return {
        type: userInputAction.userInput,
        payload: {
            author: 'Bot',
            text
        }
    }
}