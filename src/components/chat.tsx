import * as React from 'react';
import Message from './message';
import { MessageInterface } from '../interfaces/index';
import Input from './input';
import { DispatchProps } from '../App';

interface ChatProps extends DispatchProps {
    messageList: MessageInterface[];
}

const Chat = ( {messageList, handleUserInput}: ChatProps) => {
        return (
            <div className="chat">
                {messageList.map((message, index) => {
                    return <Message key={index} {...message}/>;
                })}
                <div className="chat-input">
                    <Input userInput={handleUserInput}/>
                </div>
            </div>
        );
};

export default Chat;