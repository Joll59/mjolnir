export interface StoreState {
    item: Item;
    description: string;
    messageList: MessageInterface[];
}

interface Item {
    type: string;
}

export interface ChatState {
    messageList: MessageInterface[];
}

export interface MessageInterface {
    author: string;
    text: string;
}