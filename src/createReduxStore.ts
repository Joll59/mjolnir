import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import { MessageReducer } from './reducers/message';
import { PlayerReducer, MultiItemReducer } from './reducers/player';
import { GameMapReducer } from './reducers/GameMap';

import { createEpicMiddleware } from 'redux-observable';
import { StoreState, CombinedItemAction } from './types';
import { combineEpics, Epic } from 'redux-observable';
import { AddItemEpic, RemoveItemEpic } from './epics/itemEpic';

const rootReducer: Reducer<StoreState> = combineReducers({
    message: MessageReducer,
    player: PlayerReducer,
    dungeon: GameMapReducer,
    multiItem: MultiItemReducer
});

const rootEpic: Epic<CombinedItemAction, StoreState> = combineEpics(
    AddItemEpic, RemoveItemEpic
);

const reduxStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));

// const devToolExt = 'devToolsExtension';

// const enhancer = window[devToolExt] ? window[devToolExt]()(createStore) : createStore;

// const reduxStore: Store<StoreState> = enhancer(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));

export default reduxStore;