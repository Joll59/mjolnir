import { Room } from '../../types/index';
import { RoomsReducer, RoomReducer } from '../../reducers/rooms';
import { item } from '../actions/player.test';
let allRoomsState: Map<string, Room> = new Map();

export const oneRoomState: Room = {
    inventory: [item],
    description: 'a room object',
    location: [1, 1],
    color: 'blue'
};

describe('RoomsReducer', () => {

    it('RoomsReducer is Defined', () => {
        expect(RoomsReducer).toBeDefined();
    });

    it('RoomsReducer When called with NEW_MAP returns default state', () => {
        expect(RoomsReducer(allRoomsState, { type: 'INIT' })).toMatchObject(allRoomsState);
    });

    it('state is NOT an array of rooms', () => {
        expect(Array.isArray(allRoomsState)).toEqual(false);
    });

    describe('RoomReducer: Reducer for Individual room', () => {

        it('RoomReducer is Defined', () => {
            expect(RoomReducer).toBeDefined();
        });

        it('RoomReducer returns default state', () => {
            expect(RoomReducer(oneRoomState, { type: 'INIT' })).toMatchObject(oneRoomState);
        });

        it('Removes an Item from room inventory when "GIVE_PLAYER_ITEM" action is received', () => {
            expect(RoomReducer(oneRoomState, { type: 'GIVE_PLAYER_ITEM', item }).inventory).not.toContain(item);
        });

        it('state is a room Object', () => {
            expect(typeof oneRoomState).toEqual('object');
        });
    });
});