import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux';
import { MessageReducer } from './reducers/message';
import { PlayerReducer } from './reducers/player';
import { GameMapReducer } from './reducers/GameMap';
import { createEpicMiddleware } from 'redux-observable';
import { StoreState, InputAction$ } from './types';
import { combineEpics, Epic } from 'redux-observable';
import { TestEpic } from './epics/testEpic';

const rootReducer: Reducer<StoreState> = combineReducers({
    message: MessageReducer,
    player: PlayerReducer,
    dungeon: GameMapReducer
});

const rootEpic: Epic<InputAction$,StoreState> = combineEpics(
    TestEpic
)

const reduxStore = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));

// const devToolExt = 'devToolsExtension';

// const enhancer = window[devToolExt] ? window[devToolExt]()(createStore) : createStore;

// const reduxStore: Store<StoreState> = enhancer(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));


export default reduxStore;