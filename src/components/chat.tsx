import * as React from 'react';
import Message from './message';
import { MessageInterface } from '../types';
import Input from './input';

interface ChatProps {
    messageList: MessageInterface[];
    handleUserChatInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Chat = ( {messageList, handleUserChatInput}: ChatProps) => {
        return (
            <div className="chat">
                {messageList.map((message, index) => {
                    return <Message key={index} {...message}/>;
                })}
                <div className="chat-input">
                    <Input userChatInput={handleUserChatInput}/>
                </div>
            </div>
        );
};
