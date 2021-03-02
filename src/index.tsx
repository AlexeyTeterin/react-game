import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import 'normalize.css';
import 'antd/dist/antd.css';
import './scss/index.scss';
import Game from './components/Game';
import reportWebVitals from './reportWebVitals';

const store: any = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
