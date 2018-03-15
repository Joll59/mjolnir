import { Reducer, AnyAction } from 'redux';
import { PlayerState, ItemType, PlayerAction } from '../types/index';
import { getRandomInt } from '../helpers';

let health = getRandomInt(0, 250);

let weapon = {
    id: 1, 
    power: Math.floor(Math.random() * 10) + 5, 
    type: ItemType.weapon, 
    name: 'fists'
  };
let armor = {
    id: 2 , 
    protection: getRandomInt(0, 5), 
    type: ItemType.armor, 
    name : 'basic_clothes'
  };

const InitialState: PlayerState = {
    name: 'Player', 
    health: health, 
    initialHealth: health,
    inventory: [weapon, armor],
    location: [0, 0]
    // strength: getRandomInt(10, 120),
    // experience: 0,
    // level: 0,
    // levelUpThreshold: 100,
    // weapon: this.inventory[0],
    // armor: this.inventory[1],
}; 

export const PlayerReducer: Reducer<PlayerState> = (
    state = InitialState, 
    action: AnyAction,
) => {
    switch (action.type) {
        case PlayerAction.setLocation:
            return {
                ...state, 
                location: action.payload
            };
        case PlayerAction.addItem:
            return {
                ...state, 
                inventory: [...state.inventory, action.item]
            };
        case PlayerAction.removeItem:
            let newInventory = state.inventory.filter(item => item !== action.item);
            return {
                ...state,
                inventory : newInventory
            };        
        default:
            return state;
    }
};