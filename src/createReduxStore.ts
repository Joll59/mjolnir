import { createStore, combineReducers } from 'redux';
import { MessageReducer } from './reducers/message';
import { PlayerReducer } from './reducers/player';

const rootReducer = combineReducers({
    message: MessageReducer,
    player: PlayerReducer
});

const reduxStore = createStore(rootReducer);

export default reduxStore;