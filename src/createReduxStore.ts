import { createStore } from 'redux';
import clickReducer from './reducers/clickReducer';

const reduxStore = createStore(clickReducer);

export default reduxStore;