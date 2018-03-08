import { userInputAction } from '../types';
import { MouseEvent, KeyboardEvent } from 'react';

export const handleUserChatInput = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    let text = e.currentTarget.value || e.currentTarget.name || e.currentTarget.innerText;
    return {
        type: userInputAction.userInput,
        payload : {
            author: 'User', 
            text: text
        }
    };
};