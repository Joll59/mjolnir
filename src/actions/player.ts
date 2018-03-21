import { PlayerAction, Item, Room, MultiItemAction } from '../types';

/**
 * sets the current players location given coordinates, in a [number, number] form.
 * @param playerLocation coordinates for current player location: [ x , y]
 */
export const setPlayerLocation = (
    playerLocation: [number, number],
) => ({
    type: PlayerAction.setLocation,
    payload: playerLocation
});

export const interactWithItem = (
    item: Item, 
    room: Room,
    type: PlayerAction
) => ({type, item, room});

export const multiItemResponse = (
    items: Item[], room: Room, priorAction: PlayerAction
): MultiItemAction => ({
    type: 'MULTI_ITEM',
    priorAction,
    items,
    room
});

// export const addItem = (
//     item: Item, room: Room
// ) => ({
//     type: PlayerAction.addItem,
//     item,
//     room
// });

// export const removeItem = (
//     item: Item, room: Room
// ) => ({
//     type: PlayerAction.removeItem,
//     item,
//     room
// });