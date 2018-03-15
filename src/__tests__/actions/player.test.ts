import { setPlayerLocation, addItem, removeItem } from '../../actions/player';
import { PlayerAction, Item, ItemType } from '../../types';
import { oneRoomState } from '../reducers/rooms.test';

const playerLocationAction = {
    type: PlayerAction.setLocation,
    payload: [0, 0]
};

export const item: Item = {id: 0, type: ItemType.armor , name: 'shield'};

const addItemAction = {
    type: PlayerAction.addItem,
    item,
    oneRoomState
};

const removeItemAction = {
    type: PlayerAction.removeItem,
    item,
    oneRoomState
};

describe('Player Action Creators', () => {
    describe('setPlayerLocation', () => {
        it('creates Player Location action when given player location coordinates', () => {
            expect(setPlayerLocation([0, 0])).toMatchObject(playerLocationAction);
        });
    });

    describe('addItem', () => {
        it('creates Player add item action when item is given', () => {
            expect(addItem(item, oneRoomState)).toMatchObject(addItemAction);
        });
    });

    describe('removeItem', () => {
        it('creates Player remove item action when item is given', () => {
            expect(removeItem(item, oneRoomState)).toMatchObject(removeItemAction);
        });
    });
});