import { setPlayerLocation, pickUpItem, dropItem } from '../../actions/player';
import { PlayerReducer } from '../../reducers/player';
import { expect } from 'chai';
import { PlayerState, Weapon, ItemType } from '../../types/index';

const state = {
        name: 'New Player', 
        health: 120, 
        initialHealth: 120,
        experience: 0,
        level: 0,
        levelUpThreshold: 100,
        location: <[number, number]> [0, 0],
        inventory: []
};

const fist: Weapon = {
    id: 1, 
    power: 5, 
    type: ItemType.weapon, 
    name: 'fists'
};

let nextState: PlayerState;
describe('PlayerReducer ', () => {
    
    it( 'sets player location',
        () => {
            nextState = PlayerReducer(state, setPlayerLocation([1, 1]));
            expect(nextState).to.deep.equal({...state, location: [1, 1]});
        }
    );

    describe('player inventory', () => {
        it( 'adds item to player inventory',
            () => {
                nextState = PlayerReducer(state, pickUpItem(fist) );
                expect(nextState).to.deep.equal({...state, inventory: [fist]});
            }
        );

        it ( 'removes item from player inventory',
             () => {
                nextState = PlayerReducer(state, dropItem(fist));
                expect(nextState).to.deep.equal(state);
             }
        );
    });
});