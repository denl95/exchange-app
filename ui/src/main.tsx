import * as React from 'react';
import { render } from 'react-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/App/App';

const renderApp = (Component: React.ComponentClass) => {
  render(
    <Component />,
    document.getElementById('root'),
  );
};

renderApp(App);
