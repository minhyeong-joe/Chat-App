import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import registerServiceWorker from './registerServiceWorker';
import './style/style.min.css';

import Landing from './components/landing';
import PublicChat from './components/public_chat';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/public" component={PublicChat} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
