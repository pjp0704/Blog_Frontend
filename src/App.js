import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import MainRouter from './routes/Router';
import store, { history } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/custom.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MainRouter />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
