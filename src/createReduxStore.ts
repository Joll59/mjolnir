import { createStore, combineReducers } from 'redux';
import { messageReducer } from './reducers/messageReducer';

const rootReducer = combineReducers({
    message: messageReducer
});

const reduxStore = createStore(rootReducer);

export default reduxStore;