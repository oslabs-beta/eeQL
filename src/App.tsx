import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import Landing from './pages/Landing/Landing'
import '../assets/style/global.scss'
import '../node_modules/semantic-ui-css'

const App = () => (
      <div id='global'>
         <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/home' component={Home}/>
         </Switch>
      </div>
);

export default App;
