/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define //
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDom.render(
  // providing hashrouter for electron static application
  // need to add providers here v
  <HashRouter>
        <App />
  </HashRouter>,
  document.getElementById('root'),
);
