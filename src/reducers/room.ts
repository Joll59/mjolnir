import { roomAction, Room } from '../types/index';
import { Reducer, AnyAction } from 'redux';

// const testItem = (): Item[] => {
//     let roomItem: Item = {
//         id: 1,
//         name: 'weapon',
//         type: ItemType.weapon
//     };

//     return [roomItem];
// };

// const generateRoom = (location: [number, number]): Room => {
//     return {
//         inventory: testItem(),
//         description: `room at map coordinates X:${location[0]}, Y:${location[1]}`,
//         location: location
//     };
// };

// const rooms = roomCoords.map(room => generateRoom(room));

export const RoomReducer: Reducer<Room[]> = (
    state,
    action: AnyAction,
) => {
    switch (action.type) {
        case roomAction.newMap:
            return state;
        default:
        return state;
    }
};