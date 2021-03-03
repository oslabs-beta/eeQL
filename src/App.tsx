import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../eeQL/src/components/Home/Home'
import CodeEditor from '../../eeQL/src/components/CodeEditor/CodeEditor'

const App = () => (
      <div>
         <CodeEditor/>
         <Switch>
            <Route exact path='/' component={Home} />
         </Switch>
      </div>
);

export default App;
