import './CodeEditor.scss'
import React, {useContext, useEffect, useState} from 'react';
import { StateContext } from '../../provider/StateProvider';
import MonacoEditor from 'react-monaco-editor';
import options from './options'
const { remote } = window.require('electron');
const electronFs = remote.require('fs');

const CodeEditor = () => {
    //from our glabal state
    const { activeFile, fileTree }: any = useContext(StateContext);

    //local state
    const [getContents, setContents] = useState('');
    const getFileContents = (path: String) => {
        if (path.length > 0){
            setContents(electronFs.readFileSync(path, 'utf8'))
        }
    }
    useEffect(()=> {
        getFileContents(activeFile);
        [activeFile, fileTree]
    })
  return (
      <div id='code-editor-head'>
          <header> editor</header>
          <MonacoEditor
          height="74vh"
          language="javascript"
          theme="light-dark"
          options={options}
          value={getContents}
        />
      </div>
  )
}



export default CodeEditor