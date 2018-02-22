import { playerAction, Item } from '../types';

export const setPlayerLocation = (
    playerLocation: [number, number],
) => ({
        type: playerAction.setLocation,
        payload: playerLocation
    });

export const  pickUpItem = (
    item: Item,
) => ({
        type: playerAction.pickUpItem,
        item
    });

export const dropItem = (
    item: Item
) => ({
        type: playerAction.dropItem,
        item
    });
