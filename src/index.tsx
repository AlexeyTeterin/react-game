import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Footer from './components/Footer/Footer';
import rootReducer from './model/rootReducer';
import 'normalize.css';
import 'antd/dist/antd.css';
import './index.scss';
import Game from './components/Game';
import reportWebVitals from './reportWebVitals';

const store: any = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
    <Footer />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
