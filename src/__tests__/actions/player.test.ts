import { setPlayerLocation, addItem, removeItem } from '../../actions/player';
import { playerAction, Item, ItemType } from '../../types';
import {oneRoomState} from '../reducers/rooms.test'

const playerLocationAction = {
    type: playerAction.setLocation,
    payload: [0,0]
}
export const item: Item = {id: 0, type: ItemType.armor , name: 'shield'}

const addItemAction = {
    type: playerAction.addItem,
    item
}

const removeItemAction = {
    type: playerAction.removeItem,
    item
}

describe('Player Action Creators', () => {
    describe('setPlayerLocation', () => {
        it('creates Player Location action when given player location coordinates', () => {
            expect(setPlayerLocation([0,0])).toMatchObject(playerLocationAction)
        });
    });

    describe('removeItem', () => {
        it('creates Player remove item action when item is given', () => {
            expect(removeItem(item)).toMatchObject(removeItemAction)
        });
    });

    describe('addItem', () => {
        it('creates Player add item action when item is given', () => {
            expect(addItem(item,oneRoomState)).toMatchObject(addItemAction)
        });
    });
});

