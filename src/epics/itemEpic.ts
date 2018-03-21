import {  Epic } from 'redux-observable';
import { StoreState, PlayerAction, CombinedItemAction } from '../types';
import { handleChatInput } from '../actions/user';

export const AddItemEpic: Epic<CombinedItemAction, StoreState> = (action$, store) => 
action$
.ofType(PlayerAction.addItem)
.map(action => handleChatInput(`you picked up ${action.item!.name}`, 'Bot') as any);

export const RemoveItemEpic: Epic<CombinedItemAction, StoreState> = (action$, store) =>
action$
.ofType(PlayerAction.removeItem)
.map(action => handleChatInput(`you dropped ${action.item!.name}`, 'Bot') as any);

// export const MultiItemEpic: Epic<MultiItemAction, StoreState> = (action$, store) => 
// 	action$
// 	.ofType("MULTI_ITEM").single()
