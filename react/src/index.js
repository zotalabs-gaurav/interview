import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/index.js';
import { createLogger } from "redux-logger";
const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, loggerMiddleware)
));

let app = (
    <Provider store={store}>
            <App />
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
