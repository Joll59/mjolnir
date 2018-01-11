import { type } from '../constants';
import { MessageInterface } from '../interfaces';
import { MouseEvent } from 'react';

export interface ClickedOn {
    type: type.CLICKED;
}

interface Payload {
    payload: MessageInterface;
}

export type ObjectClick = ClickedOn & Payload;

export function clicked(e: MouseEvent<HTMLButtonElement>): ClickedOn & Payload {
    return {
        type: type.CLICKED,
        payload : {author: 'User', text: `clicked on ${e.currentTarget.innerText}`}
    };
}
