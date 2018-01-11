import * as React from 'react';
import Message from './message';
import { MessageInterface } from '../interfaces/index';

interface ChatProps {
    messageList: MessageInterface[];
}

const Chat = ( {messageList}: ChatProps) => {
        return (
            <div className="chat">
                {messageList.map((message, index) => {
                    return <Message key={index} {...message}/>;
                })}
            </div>
        );
};

export default Chat;