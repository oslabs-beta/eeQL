import React, { useState } from 'react';

let state: any = {}
//create init state w/ empty string
export const InputState = React.createContext(state);
//create handler that can edit string w/ user input 

//initial state
const CodeProviders = ({ children }: any) => {
    const [input, setInput] = useState('');
    const [fileTree, setFileTree] = useState([]);
    const [chosenFile, setChosenFile] = useState('');
    const [testFileName, setTestFileName] = useState('');
    const [toggleTree, setToggleTree] = useState(true);
//handler that changes it
    const inputHandler = (inputValue: string):void => {
        setInput(inputValue)
        console.log(InputState)
    };
    const fileTreeHandler = (tree: any): void => {
        setFileTree(tree);
      };
    
      const chosenFileHandler = (chosen: string): void => {
        setChosenFile(chosen);
      };
    
      const handleToggleTree = (): void => {
        setToggleTree(!toggleTree);
      };
    
return (
    <InputState.Provider
        value={{
        input,
        inputHandler,
        fileTree,
        fileTreeHandler,
        chosenFile,
        chosenFileHandler,
        toggleTree,
        handleToggleTree,
        testFileName,
        setTestFileName,
        }} >
    {children}
    </InputState.Provider>
)
}


export default CodeProviders;