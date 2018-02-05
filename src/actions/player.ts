import { playerAction, Item } from '../types';

export const setPlayerLocation = (
    x: number, 
    y: number,
) => {
    return {
        type: playerAction.setLocation,
        payload: {x: x, y: y}
    };
};

export const  pickUp = (
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