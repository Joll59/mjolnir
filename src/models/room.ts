
const createRoomGrid = () => {
    let grid: Array<{}> = [];

    for (let i = 0; i < 5; i++) {
        grid.push([]);
        for (let j = 0; j < 5; j++) {
            if ( j === 4 && i === 0 ) {
                 grid[i][j] = {id: [i, j], type: 'door'};
            } else {
                grid[i][j] = { id: [i, j], type: 'floor'};
            }
        }
    }
    return grid;
}; 
