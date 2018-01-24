import { type } from '../constants';
import { MessageInterface } from '../interfaces';
import { MouseEvent, KeyboardEvent } from 'react';

export interface ClickedOn {
    type: type.CLICKED;
}

interface Payload {
    payload: MessageInterface;
}

export type ObjectClick = ClickedOn & Payload;

export function handleUserInput(
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>): ObjectClick {
    return {
        type: type.CLICKED,
        payload : {author: 'User', text: `${e.currentTarget.innerText || e.currentTarget.value}`}
    };
}
