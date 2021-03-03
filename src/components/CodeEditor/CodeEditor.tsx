import './CodeEditor.scss'
import React, {useContext, useEffect, useState} from 'react';
import {InputState} from '../../provider/CodeProvider';
import MonacoEditor from 'react-monaco-editor';


const { remote } = window.require('electron');
const electronFs = remote.require('fs');

let exFileTree = ["readme.md", ['src',['components', ['Home',['Home.scss','Home.tsx']]]]]

const CodeEditor = () => {
    //from our glabal state
    const { chosenFile, fileTree }: any = useContext(InputState);


    //local state
    const [getContents, setContents] = useState('');
    const getFileContents = (path: String) => {
        if (path.length > 0){
            setContents(electronFs.readFileSync(path, 'utf8'))
        }
    }
    useEffect(()=> {
        getFileContents(chosenFile);
        [chosenFile, fileTree]
    })
    const options: any = {
    selectOnLineNumbers: true,
    autoIndent: true,
    colorDecorators: true,
    wrappingIndent: 'indent',
    wordWrap: 'bounded',
    automaticLayout: true,
    }
  return (
      <div id = 'editor'>
          <header id = "editor Header" > editor</header>
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