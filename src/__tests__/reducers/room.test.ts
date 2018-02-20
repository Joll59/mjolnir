// import { expect } from 'chai';
import { Room } from '../../types/index';

let roomState: Room[];

describe('RoomReducer', () => {

    it('RoomReducer is defined', 
       () => {
            expect(RoomReducer()).toBeDefined();
        });

    it( 'room state is an array',
        () => {
            expect(Array.isArray(roomState)).toEqual(true);
        }
    );
});