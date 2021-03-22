/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define //
import React from "react";
import ReactDom from "react-dom";
import { HashRouter } from "react-router-dom";
import StateProvider from "./provider/StateProvider.tsx";
import TestProvider from "./provider/TestProvider.tsx";
import DataProvider from "./provider/TestProvider.tsx";

import App from "./App";

ReactDom.render(
  // providing hashrouter for electron static application
  // need to add providers here v
  <HashRouter>
    <DataProvider>
      <TestProvider>
        <StateProvider>
          <App />
        </StateProvider>
      </TestProvider>
    </DataProvider>
  </HashRouter>,
  document.getElementById("root")
);
