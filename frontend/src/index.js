import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { user, livestream } from './redux/reducers'
import App from './AppContainer';
import './index.css';

const store = createStore(
  combineReducers({
    user: user,
    livestream: livestream
  }),
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root'));
