import { Doorways } from '../models/doorways';
// VIEW/REACT TYPES

export interface GameMapState {
    map: Doorways;
    rooms: Map<string, Room>;
}

export type StoreState = {
    message: MessageState;
    player: PlayerState;
    dungeon: GameMapState;
    multiItem: MultiItem;
};

export type MessageState = {
    conversationTopic: string;
    messageList: MessageInterface[];
};

export type MessageInterface = {
    author: string;
    text: string;
};

export enum InputAction {
    input = 'INPUT',
    clear = 'CLEAR_CHAT',
}

export enum MapAction {
    newLevel = 'NEW_LEVEL',
}

export enum RoomAction {
    playerTakesItem = 'ADD_ITEM',
    playerGivesItem = 'REMOVE_ITEM',
    givePlayerItem = 'GIVE_PLAYER_ITEM',
    takePlayerItem = 'TAKE_PLAYER_ITEM'
}

export enum PlayerAction {
    addItem = 'ADD_ITEM',
    removeItem = 'REMOVE_ITEM',
    setLocation = 'SET_LOCATION',
    // useItem = 'USE_ITEM',
    // attack = 'ATTACK',
    // receiveDamage = 'RECEIVE_DAMAGE',
    // isDead = 'IS_DEAD',
    // gainExperience = 'GAIN_EXPERIENCE',
}

type AddItemAction = {
    type: PlayerAction.addItem;
    room: Room;
    item: Item;
};

type RemoveItemAction = {
    type: PlayerAction.removeItem;
    room: Room;
    item: Item;
};

export type MultiItem = {
    priorAction?: PlayerAction;
    items: Item[];
    room?: Room;
    item?: Item;
};

export type MultiItemAction = {
    type: 'MULTI_ITEM';
    priorAction: PlayerAction;
    items: Item[];
    room: Room;
    item?: Item;
};

export type CombinedItemAction = AddItemAction | RemoveItemAction | MultiItemAction;

// GAME LOGIC TYPES

export enum ItemType {
    armor = 'armor',
    nothing = 'nothing',
    health = 'health',
    chocolateCoins = 'chocolateCoins',
    weapon = 'weapon',
}

export type Direction = 'N' | 'S' | 'E' | 'W';

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
    color: string;
}