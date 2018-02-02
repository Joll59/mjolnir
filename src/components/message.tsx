import * as React from 'react';
import { MessageInterface } from '../types';

const Message = (props: MessageInterface) => {
    let msgClass = 'message ';
    if (!/(bot)/gi.test(props.author)) { msgClass += 'user'; }
    return <div> <p className={msgClass}>{props.author}: {props.text}</p> </div>;
};
export default Message;