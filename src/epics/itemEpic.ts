import {  Epic } from 'redux-observable';
import { StoreState, PlayerAction, CombinedItemAction } from '../types';
import { handleBotChatOuput } from '../actions/user';

export const AddItemEpic: Epic<CombinedItemAction, StoreState> = (action$, store) => 
	action$
	.ofType(PlayerAction.addItem)
	.map(action => handleBotChatOuput(`you picked up ${action.item.name}`) as any)

export const RemoveItemEpic: Epic<CombinedItemAction, StoreState> = (action$, store) =>
	action$
		.ofType(PlayerAction.removeItem)
		.map(action => handleBotChatOuput(`you dropped ${action.item.name}`) as any)

// export const MultiItemEpic: Epic<CombinedItemAction, StoreState> = (action$, store) => 
// 	action$
// 		.ofType("MULTI_ITEM")
// 		.map(action => console.log(action))
