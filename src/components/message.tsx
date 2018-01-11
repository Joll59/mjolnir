import * as React from 'react';
import { MessageInterface } from '../interfaces';

const Message = (props: MessageInterface) => {
    let msgClass = 'message ';
    if (props.author !== 'Bot') { msgClass += 'user'; }
    return <div> <p className={msgClass}>{props.author}: {props.text}</p> </div>;
};
export default Message;