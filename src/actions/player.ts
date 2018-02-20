import { playerAction, Item } from '../types';

export const setPlayerLocation = (playerLocation: [number, number]) => {
    return {
        type: playerAction.setLocation,
        payload: playerLocation
    };
};

export const  pickUpItem = (
    item: Item,
) => {
    return {
        type: playerAction.pickUpItem,
        item
    };
};

export const dropItem = (
    item: Item
) => {
    return {
        type: playerAction.dropItem,
        itemId: item.id
    };
};