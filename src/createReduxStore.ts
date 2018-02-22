import { createStore, combineReducers } from 'redux';
import { MessageReducer } from './reducers/message';
import { PlayerReducer } from './reducers/player';
import { GameMapReducer } from './reducers/GameMap';

const rootReducer = combineReducers({
    message: MessageReducer,
    player: PlayerReducer,
    gameMap: GameMapReducer
});

const devToolExt = 'devToolsExtension';

const enhancer = window[devToolExt] ? window[devToolExt]()(createStore) : createStore;

const reduxStore = enhancer(rootReducer);

// const reduxStore = createStore(rootReducer);

export default reduxStore;