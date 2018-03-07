import { AnyAction, Reducer } from 'redux';

import { Doorways } from '../models/doorways';
import { GameMapState, Item, ItemType, mapAction, Room, playerAction } from '../types';
import { RoomsReducer } from './rooms';

import { getRandomInt } from '../helpers/random';

const c = {
    GRID_HEIGHT: 4,
    GRID_WIDTH: 4,
    MAX_ROOMS: 15,
};
  
const createGrid = () => {
    let grid: Array<Array<[number, number]>> = [];
    for (let column = 0; column < c.GRID_HEIGHT; column++) {
        grid.push([]);
        for (let row = 0; row < c.GRID_WIDTH; row++) {
            grid[column].push([row, column]);
        }
    }
    return grid;
};

const mapPath =  new Doorways(c.MAX_ROOMS, [c.GRID_WIDTH, c.GRID_HEIGHT]);

const coordinatesForAllRooms = mapPath.getConnectedRooms();

let idCounter = 0;

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
        name: `${item}${idCounter}`,
        type: <ItemType>ItemType[item]
    }));
};


const generateRoom = (roomCoordinate: [number, number]): Room => {
    return {
        description: `Room${roomCoordinate[0]}${roomCoordinate[1]}`,
        inventory: randomItems(),
        location: roomCoordinate,
    };
};

const rooms = coordinatesForAllRooms.map(coordinate => generateRoom(coordinate));

const InitialState: GameMapState = {
    grid: createGrid(),
    map: mapPath,
    rooms: RoomsReducer(rooms, {type: 'INIT'}),
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
            }    
        default:
        return state;
    }
};