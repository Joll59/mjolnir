import Player from '../models/player';

export type MessageState = {
    description: string;
    messageList: MessageInterface[];
};

export type StoreState = {
    message: MessageState;
    item?: Item;
    player?: Player;
};

export enum ItemType {
    weapon,
    chest,
    key,
    health,
    armor,
}

export interface Item {
    id: number;
    type: ItemType;
    name: string;
    description?: string;
    // equipable?: boolean;
    // questItem?: boolean;
    // action?: string;
}

export interface Weapon extends Item {
    power: number;
}

export interface Armor extends Item {
    protection: number;
}

export interface Entity {
    name?: string;
    type?: string;
    level?: number;
    inventory?: Item[]; // should all entities have an inventory?
    weapon?: Weapon;
    armor?: Armor;
    location: { x: number, y: number, z?: number };
}

export type ChatState = {
    messageList: MessageInterface[];
};

export type MessageInterface = {
    author: string;
    text: string;
};

export enum actionTypes {
    clicked = 'CLICKED'
}
