import { setPlayerLocation, interactWithItem } from '../../actions/player';
import { PlayerReducer } from '../../reducers/player';
import { PlayerState, Weapon, ItemType, PlayerAction } from '../../types/index';
import { oneRoomState } from './rooms.test';

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
    it('returns inital state', () => {
        expect(PlayerReducer(state, {type: 'INIT'})).toMatchObject(state);
    });

    it( 'sets player location', () => {
        nextState = PlayerReducer(state, setPlayerLocation([1, 1]));
        expect(nextState).toMatchObject({...state, location: [1, 1]});
    });

    describe('player inventory', () => {
        it( 'adds item to player inventory', () => {
            nextState = PlayerReducer(state, interactWithItem(fist, oneRoomState, PlayerAction.addItem));
            expect(nextState).toMatchObject({...state, inventory: [fist]});
        });

        it ( 'removes item from player inventory', () => {
            nextState = PlayerReducer(state, interactWithItem(fist, oneRoomState, PlayerAction.removeItem));
            expect(nextState).toMatchObject(state);
        });
    });
});