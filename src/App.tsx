import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home'

const App = () => (
      <div>
         <Switch>
            <Route exact path='/' component={Home} />
         </Switch>
      </div>
);

export default App;
