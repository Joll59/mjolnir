import { AnyAction, Reducer } from 'redux';

import { Doorways } from '../models/doorways';
import { GameMapState, Item, ItemType, mapAction, Room, roomAction, playerAction } from '../types';
import { RoomsReducer } from './rooms';

// import { getRandomInt } from '../helpers/random';

const c = {
    GRID_HEIGHT: 5,
    GRID_WIDTH: 5,
    MAX_ROOMS: 10,
};
  
const createGrid = () => {
    let grid: Array<Array<[number, number]>> = [];
    for (let y = 0; y < c.GRID_HEIGHT; y++) {
        grid.push([]);
        for (let x = 0; x < c.GRID_WIDTH; x++) {
            grid[y].push([x, y]);
        }
    }
    return grid;
};

const mapPath =  new Doorways(c.MAX_ROOMS, [c.GRID_WIDTH, c.GRID_HEIGHT]);

const roomCoords = mapPath.getConnectedRooms();

let idCounter = 0;

const testItem = (): Item => {
    let roomItem: Item = {
        id: idCounter++,
        name: 'weapon',
        type: ItemType.weapon
    };
    return roomItem;
};

const generateRoom = (location: [number, number]): Room => {
    return {
        inventory: [testItem(), testItem()],
        description: `room at map coordinates X:${location[0]}, Y:${location[1]}`,
        location: location
    };
};

const rooms = roomCoords.map(room => generateRoom(room));

const InitialState: GameMapState = {
    grid: createGrid(),
    map: mapPath,
    rooms: RoomsReducer(rooms, {type: roomAction.newMap}),
};

export const GameMapReducer: Reducer<GameMapState> = (
    state = InitialState,
    action: AnyAction,
) => {
    switch (action.type) {
        case mapAction.newLevel:
            return state;
        case playerAction.addItem: 
            return {
                ...state, rooms: RoomsReducer(state.rooms, action)
            }    
        default:
        return state;
    }
};