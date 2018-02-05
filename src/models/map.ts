const c = { 
    GRID_HEIGHT: 40, 
    GRID_WIDTH : 40, 
    MAX_ROOMS: 15, 
    ROOM_SIZE_RANGE: [7, 12] 
};

const createDungeon: () => {}[] = () => {
    let grid: Array<{}> = [];

    for (let i = 0; i < c.GRID_HEIGHT; i++) {
        grid.push([]);
        for (let index = 0; index < c.GRID_WIDTH; index++) {
            grid[i][index] = {type: 0, opacity: 1 } ;
    
        }
    }

    return grid;
};