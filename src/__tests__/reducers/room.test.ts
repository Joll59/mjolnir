// import { expect } from 'chai';
import { Room } from '../../types/index';
import { RoomReducer } from '../../reducers/room';

let roomState: Room[]= [];

describe('RoomReducer', () => {

    it('RoomReducer is defined', 
       () => {
            expect(RoomReducer(roomState, {type: 'NEW_MAP'})).toEqual(roomState);
        });

    it( 'room state is an array',
        () => {
            expect(Array.isArray(roomState)).toEqual(true);
        }
    );
});