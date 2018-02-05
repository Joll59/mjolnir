import { actionTypes } from '../types';
import { MouseEvent, KeyboardEvent } from 'react';

export const handleUserInput = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    return {
        type: actionTypes.clicked,
        payload : {
            author: 'User', 
            text: `${e.currentTarget.innerText || e.currentTarget.value}`
        }
    };
};
