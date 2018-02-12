import { Doorways } from '../models/doorways';
import { Reducer, AnyAction } from 'redux';
import { GameMapState } from '../types/index';

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

const InitialState: GameMapState = {
    grid: createGrid(),
    mapPath: new Doorways(c.MAX_ROOMS, [c.GRID_WIDTH, c.GRID_HEIGHT]),
};

export const GameMapReducer: Reducer<GameMapState> = (
    state = InitialState,
    action: AnyAction,
) => {
    switch (action.type) {
        case 'NEW_LEVEL':
            return {...state, mapPath: new Doorways(c.MAX_ROOMS, [c.GRID_WIDTH, c.GRID_HEIGHT])};
        default:
        return state;
    }
};