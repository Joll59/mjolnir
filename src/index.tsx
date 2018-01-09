import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import interactReducer from './reducers/interactReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(interactReducer);
ReactDOM.render(
  <Provider store={store}>
  <App /> 
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
