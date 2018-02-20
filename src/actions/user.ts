import { actionTypes } from '../types';
import { MouseEvent, KeyboardEvent } from 'react';

export const handleUserChatInput = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    let text = e.currentTarget.value || e.currentTarget.innerText;
    return {
        type: actionTypes.userInput,
        payload : {
            author: 'User', 
            text: text
        }
    };
};
