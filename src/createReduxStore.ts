import { createStore, combineReducers } from 'redux';
import { MessageReducer } from './reducers/message';
import { PlayerReducer } from './reducers/player';
import { GameMapReducer } from './reducers/GameMap';

const rootReducer = combineReducers({
    message: MessageReducer,
    player: PlayerReducer,
    gameMap: GameMapReducer
});

const reduxStore = createStore(rootReducer);

export default reduxStore;