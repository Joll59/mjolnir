import { roomAction, Room } from '../types/index';
import { Reducer, AnyAction } from 'redux';

export const RoomsReducer: Reducer<Room[]> = (
    state,
    action: AnyAction,
) => {
    switch (action.type) {
        case roomAction.newMap:
            return state;
        case roomAction.playerTakesItem:
        let currentRoom = state[0]; // currently needs to find room before anything.....
        debugger
            return [...state, state[0]= RoomReducer(currentRoom, {type:"GIVE_PLAYER_ITEM", item: action.item})]
        default:
            return state;
    }
};

/**
 * reducer for each individual room
 * @param state current room
 * @param action action to take in room, currently revolves around inventory. 
 */
export const RoomReducer: Reducer<Room> = (state, action:AnyAction) => {
    switch (action.type) {
        case "GIVE_PLAYER_ITEM":
        let newInventory = state.inventory.filter(item => item !== action.item);
        return {
            ...state,
            inventory : newInventory
        }
        default:
            return state;
    }
}

// would it make sense to have an inventory reducer instead.??? takes an inventory as state and returns a new inventory......simple enough so both player and room use that reducer for any invetory action..... worth exploring. 