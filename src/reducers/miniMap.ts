import { Doorways } from '../models/doorways';
import { Reducer, AnyAction } from 'redux';
import { MiniMapState } from '../types/index';

const c = {
    GRID_HEIGHT: 5,
    GRID_WIDTH: 5,
    MAX_ROOMS: 10,
};
  
const mapPath = new Doorways(c.MAX_ROOMS, [c.GRID_WIDTH, c.GRID_HEIGHT]);

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

// interface MiniMapState {
//     grid: Array<Array<[number, number]>>;
//     mapPath: Doorways;
// }

const InitialState: MiniMapState = {
    grid: createGrid(),
    mapPath: mapPath
};

export const MiniMapReducer: Reducer<MiniMapState> = (
    state = InitialState,
    action: AnyAction,
) => {
    switch (action.type) {
        default:
        console.log(state.mapPath);
        console.log(state.mapPath.possibleDoors([0, 0]));
        return state;
    }
};