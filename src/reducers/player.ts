import { Reducer, AnyAction } from 'redux';
import { PlayerState, ItemType, playerAction } from '../types/index';
import { getRandomInt } from '../helpers/random';

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
    name: 'New Player', 
    type: 'Player', 
    health: health, 
    // strength: getRandomInt(10, 120),
    initialHealth: health,
    // experience: 0,
    level: 0,
    // levelUpThreshold: 100,
    inventory: [weapon, armor],
    weapon: weapon,
    armor: armor,
    location: [0, 0]
}; 

export const PlayerReducer: Reducer<PlayerState> = (
    state = InitialState, 
    action: AnyAction,
) => {
    switch (action.type) {
        case playerAction.setLocation:
            return {
                ...state, 
                location: action.payload
            };
        case playerAction.pickUpItem:
            return {
                ...state, 
                inventory: [...state.inventory, action.item]
            };
        case playerAction.dropItem:
            let newInventory = state.inventory.filter(item => item.id !== action.itemId);
            return {
                ...state,
                inventory : newInventory
            };        
        default:
            return state;
    }
};