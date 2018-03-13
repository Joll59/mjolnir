import { AnyAction, Reducer } from 'redux';

import { Doorways } from '../models/doorways';
import { GameMapState, Item, ItemType, mapAction, Room, playerAction } from '../types';
import { RoomsReducer } from './rooms';

import { getRandomInt } from '../helpers';

const c = {
    columnLength: 5,
    rowLength: 6,
    paths: 15,
};

const mapPath = new Doorways(c.paths, [c.rowLength, c.columnLength]);

const coordinatesForAllRooms = mapPath.getConnectedRooms();

let idCounter = 3;

const randomItems = (): Item[] => {
    let itemTypes = [];
    for (let item in ItemType) {
        itemTypes.push(item);
    }

    const randomStart = Math.floor(Math.random() * itemTypes.length);
    const removeAmount = getRandomInt(0, itemTypes.length - 1);
    const availableItemTypes = itemTypes.splice(randomStart, removeAmount);

    return availableItemTypes.map(item => ({
        id: idCounter++,
        name: `${item}`,
        type: <ItemType>ItemType[item]
    }));
};
const roomJSMap = new Map<string, Room>()

const generateRoom = (roomCoordinate: [number, number]) => {
    roomJSMap.set(roomCoordinate.toString(), {
        description: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        inventory: randomItems(),
        location: roomCoordinate,
    });
};

coordinatesForAllRooms.map(coordinate => generateRoom(coordinate));

const InitialState: GameMapState = {
    map: mapPath,
    rooms: RoomsReducer(roomJSMap, { type: 'INIT' })
};

export const GameMapReducer: Reducer<GameMapState> = (
    state = InitialState,
    action: AnyAction,
) => {
    switch (action.type) {
        case mapAction.newLevel:
            return InitialState;
        case playerAction.addItem:
            return {
                ...state, rooms: RoomsReducer(state.rooms, action)
            };
        case playerAction.removeItem:
            return {
                ...state, rooms: RoomsReducer(state.rooms, action)
            };
        default:
            return state;
    }
};