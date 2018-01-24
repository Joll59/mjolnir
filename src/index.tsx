import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import  reduxStore from './createReduxStore';

ReactDOM.render(
  <Provider store={reduxStore}>
    <App /> 
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
