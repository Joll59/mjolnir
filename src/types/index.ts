import { Doorways } from '../models/doorways';
// VIEW/REACT TYPES

export type StoreState = {
    message: MessageState;
    player: PlayerState;
    gameMap: GameMapState;
};

export type MessageState = {
    description: string;
    messageList: MessageInterface[];
};

export interface GameMapState {
    grid: Array<Array<[number, number]>>;
    map: Doorways;
    rooms: Room[];
}

export type MessageInterface = {
    author: string;
    text: string;
};

export enum userInputAction {
    userInput = 'USER_INPUT',
}

export enum mapAction {
    newLevel = 'NEW_LEVEL',
}

export enum roomAction {
    playerTakesItem = 'ADD_ITEM'
}

export enum playerAction {
    addItem = 'ADD_ITEM',
    removeItem = 'REMOVE_ITEM',
    setLocation = 'SET_LOCATION',
    // useItem = 'USE_ITEM',
    // attack = 'ATTACK',
    // receiveDamage = 'RECEIVE_DAMAGE',
    // isDead = 'IS_DEAD',
    // gainExperience = 'GAIN_EXPERIENCE',
}

// GAME LOGIC TYPES

export enum ItemType {
    weapon = 'weapon',
    health = 'health',
    armor = 'armor',
}

export type Direction = 'N' | 'S' | 'E' | 'W' ;

export interface Item {
    id: number;
    type: ItemType;
    name: string;
    description?: string;
    // equipable?: boolean;
    // questItem?: boolean;
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
    location?: [number, number];
}

export interface PlayerState {
    name: string;
    health: number;
    initialHealth: number;
    inventory: Item[];
    location: [number, number];
    // strength: number;
    // experience: number;
    // level: number;
    // weapon: Weapon; 
    // // consider individual interfaces for weapon and armor both extending item, so you can use power/protection.
    // armor: Armor;
    // levelUpThreshold: number;
}

export interface Room {
    inventory: Item[];
    description: string;
    location: [number, number];
}