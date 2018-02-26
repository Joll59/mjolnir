// import { expect } from 'chai';
import { Room } from '../../types/index';
import { RoomsReducer } from '../../reducers/room';

let roomState: Room[]= [];

describe('RoomsReducer', () => {

    it('RoomsReducer is defined', 
       () => {
            expect(RoomsReducer(roomState, {type: 'NEW_MAP'})).toEqual(roomState);
        });

    it( 'state is an array of rooms',
        () => {
            expect(Array.isArray(roomState)).toEqual(true);
        }
    );
});