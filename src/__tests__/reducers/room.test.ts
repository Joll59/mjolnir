// // import { expect } from 'chai';
// import { Room } from '../../types/index';

// let roomState: Room[];
// let nextState: Room[];
// describe('RoomReducer', () => {

//     it('RoomReducer is defined', 
//        () => {
//             expect(RoomReducer()).toBeDefined();
//         });

//     it( 'room state is an array',
//         () => {
//             expect(Array.isArray(roomState)).toEqual(true);
//         }
//     );
//     describe('State changes', () => {
//         it('create room in roomState and returns nextState', 
//            () => {
//             nextState = RoomReducer(roomState, createRoom([1, 2]));
//             expect(nextState).not.toEqual(roomState);
//         });
//         it('expect nextState to include newly added room', 
//            () => {
//             expect(nextState[nextState.length - 1]).toContain({location: [1, 2]});
//         });
//     });
// });