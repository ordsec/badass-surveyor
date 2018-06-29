import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

import reducers from './reducers';

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  applyMiddleware()
);

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  jsx, document.getElementById('root')
);
