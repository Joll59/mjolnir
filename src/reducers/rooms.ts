import { RoomAction, Room } from '../types/index';
import { Reducer, AnyAction } from 'redux';

/**
 * reducer for each individual room
 * @param state current room state, Room Object
 * @param action Object with a type field relating to action to take in room, currently revolves around inventory. 
 */
export const RoomReducer: Reducer<Room> = (state, action: AnyAction) => {
    switch (action.type) {
        case RoomAction.givePlayerItem:
            let newInventory = state.inventory.filter(item => item !== action.item);
            return {
                ...state,
                inventory: newInventory
            };
        case RoomAction.takePlayerItem:
            return {
                ...state,
                inventory: [...state.inventory, action.item]
            };
        default:
            return state;
    }
};

/* IDEA: would it make sense to have an inventory reducer instead.??? 
takes an inventory as state and returns a new inventory......simple 
enough so both player and room use that reducer for any invetory action..... 
worth exploring. */

/**
 * reducer for rooms 
 * @param state rooms Map,
 * @param action object with a type. 
 */
export const RoomsReducer: Reducer<Map<string, Room>> = (
    state, // state is now a Map not an array, you can't filter a map.....recreate. 
    action: AnyAction,
) => {
    let newState = new Map(state);
    switch (action.type) {
        case RoomAction.playerTakesItem:
            newState.set(action.room.location.toString(),
                RoomReducer(
                    action.room,
                    {
                        type: RoomAction.givePlayerItem,
                        item: action.item
                    }
                ))
            return newState;
        case RoomAction.playerGivesItem:
            newState.set(action.room.location.toString(),
                RoomReducer(
                    action.room,
                    {
                        type: RoomAction.takePlayerItem,
                        item: action.item
                    }
                ))
            return newState;
        default:
            return state;
    }
};