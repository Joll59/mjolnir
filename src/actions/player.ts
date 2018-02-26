import { playerAction, Item } from '../types';

export const setPlayerLocation = (
    playerLocation: [number, number],
) => ({
        type: playerAction.setLocation,
        payload: playerLocation
    });

export const  addItem = (
    item: Item,
) => ({
        type: playerAction.addItem,
        item
    });

export const removeItem = (
    item: Item
) => ({
        type: playerAction.removeItem,
        item
    });
