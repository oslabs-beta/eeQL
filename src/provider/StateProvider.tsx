import React, { useState } from 'react';

// set a variable to export state/handlers into components
export const StateContext = React.createContext({});

const StateProvider = ({ children }: any) => {

  const [darkMode, setDarkMode] = useState(true) 
  const darkModeHandler = () => {
    setDarkMode(!darkMode)
  }
 
  // update and set state for user active chosen file
    const [updateTree, setUpdateTree] = useState(false) 
    const updateTreeHandler = () => {
      setUpdateTree(!updateTree)
    }
    const [activePort, setActivePort] = useState('')
    const activePortHandler = (port: string): void => {
      setActivePort(port)
    }
    const [activeFile, setActiveFile] = useState('');
    const activeFileHandler = (chosen: string): void => { 
      setActiveFile(chosen) };
  // update and set the current directory for the user's chosen project
    const [userPath, setUserPath] = useState('');
    const pathHandler = (pathValue: string):void => { 
      setUserPath(pathValue) };
  // update the on/off of the file tree set below
    const [toggleFileTree, setToggleFileTree] = useState(true);
    const handleToggleFileTree = (): void => { 
      setToggleFileTree(!toggleFileTree) };
  // update and set the file tree for the directory    
    const [fileTree, setFileTree] = useState([]);
    const fileTreeHandler = (tree: any): void => { 
      setFileTree(tree) };
  // update and set the name of the file that is being exported to the user's fs
    const [testFileName, setTestFileName] = useState('');

  // return a wrapped component with the values of state and the functions to change them.
return (
    <StateContext.Provider value = {{ 
        darkMode, darkModeHandler,
        updateTree, updateTreeHandler,
        activePort, activePortHandler, 
        userPath, pathHandler,
        fileTree, fileTreeHandler,
        activeFile, activeFileHandler,
        toggleFileTree, handleToggleFileTree,
        testFileName, setTestFileName 
        }}>
      { children }
    </StateContext.Provider>
)}

// export the stateProvider to be accessed when wrapping the head of our react application
export default StateProvider;