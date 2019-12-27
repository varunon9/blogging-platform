import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppRoutes from './containers/AppRoutes';

const history = createBrowserHistory({
  basename: '/'
});

function App() {
  return (
    <Router history={history}>
      <AppRoutes />
    </Router>
  );
}

export default App;
