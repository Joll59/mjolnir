import * as React from 'react';
import Message from './message';
import { MessageInterface } from '../types';
import Input from './input';
import * as Rx from 'rxjs';

interface ChatProps {
    messageList: MessageInterface[];
    handleUserChatInput: Rx.Subject<string>;
}

export const Chat = ( {messageList, handleUserChatInput}: ChatProps) => {
        return (
            <div className="chatWindow">
                {messageList.map((message, index) => {
                    return <Message key={index} {...message}/>;
                })}
                <div className="chat-input">
                    <Input userChatInput={handleUserChatInput}/>
                </div>
            </div>
        );
};
