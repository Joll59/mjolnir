import { createStore, combineReducers } from 'redux';
import { MessageReducer } from './reducers/message';
import { PlayerReducer } from './reducers/player';
import { MiniMapReducer } from './reducers/miniMap';

const rootReducer = combineReducers({
    message: MessageReducer,
    player: PlayerReducer,
    map: MiniMapReducer
});

const reduxStore = createStore(rootReducer);

export default reduxStore;