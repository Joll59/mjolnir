import { setPlayerLocation } from '../../actions/player';
import { PlayerReducer } from '../../reducers/player';
import { expect } from 'chai';

const state = {
        name: 'New Player', 
        health: 120, 
        initialHealth: 120,
        experience: 0,
        level: 0,
        levelUpThreshold: 100,
        location: {x: 0, y: 0},
        inventory: []
};

const nextState = PlayerReducer(state, setPlayerLocation(1, 1));
it(
    'testing player reducer setting player location',
    () => {
        expect(nextState).to.deep.equal({...state, location: {x: 1, y: 1}});
    }
);