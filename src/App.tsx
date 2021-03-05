import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload/FileUpload'
import CodeEditor from '../../eeQL/src/components/CodeEditor/CodeEditor'

const App = () => (
      <div>
         <Switch>
            <Route exact path='/' component={FileUpload} />
         </Switch>
      </div>
);

export default App;
