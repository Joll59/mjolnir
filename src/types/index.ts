import { Doorways } from '../models/doorways';
// VIEW/REACT TYPES

export type StoreState = {
    message: MessageState;
    item?: Item;
    player?: PlayerState;
    map?: MiniMapState;
};

export type MessageState = {
    description: string;
    messageList: MessageInterface[];
};

export type MessageInterface = {
    author: string;
    text: string;
};

export enum actionTypes {
    clicked = 'CLICKED'
}

export enum playerAction {
    pickUpItem = 'PICK_UP_ITEM',
    dropItem = 'DROP_ITEM',
    useItem = 'USE_ITEM',
    setLocation = 'SET_LOCATION',
    attack = 'ATTACK',
    receiveDamage = 'RECEIVE_DAMAGE',
    isDead = 'IS_DEAD',
    gainExperience = 'GAIN_EXPERIENCE',
}

// GAME LOGIC TYPES

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
    location?: { x: number, y: number, z?: number };
}

export interface PlayerState extends Entity {
    name: string;
    // type: string;
    health: number;
    initialHealth: number;
    // strength: number;
    // experience: number;
    // level: number;
    inventory: Item[];
    // weapon: Weapon; 
    // // consider individual interfaces for weapon and armor both extending item, so you can use power/protection.
    // armor: Armor;
    // levelUpThreshold: number;
    location: { x: number, y: number };
}

export interface MiniMapState {
    grid: Array<Array<[number, number]>>;
    mapPath: Doorways;
}