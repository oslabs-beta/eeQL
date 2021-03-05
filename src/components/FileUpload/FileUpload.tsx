/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { render } from 'react-dom';
import { StateContext } from '../../provider/StateProvider';
import CodeEditor from '../CodeEditor/CodeEditor';
import FileTree from '../FileTree/FileTree'

const { remote } = window.require('electron');
const fs = remote.require('fs')
let current: string = '';
let directoryArray;
let fileArray;


const FileUpload = () => {
    const { fileTreeHandler, pathHandler, fileTree}: any = useContext(StateContext);
    const getPath = () => { remote.dialog
          .showOpenDialog({ properties: ['openDirectory'], message: 'Please choose your project folder'})
          .then((files: any) => {
            if (!files.cancelled) {
                pathHandler(files.filePaths[0]);
                current = files.filePaths[0];
                generateFileTree(current); }
              })
            }

    const generateFileTree = (dir) => {
          let getDirectory = (current) => {
          directoryArray = fs.readdirSync(current).filter(file => file !== 'node_modules' && file[0] !== '.');
            if (directoryArray.filter((file, i) => !file.includes('')) == []) { return directoryArray; }; 
          }
          getDirectory(dir)

          fileArray = directoryArray.map((name: string) => {
            let path = dir;
            path = `${path}/${name}`;
            const file: any = { path, name, files: [] };
            
          if (!file.name.includes('.')) { 
            file.files = generateFileTree(file.path) 
          }
            return file 
        });
          fileTreeHandler(fileArray)
          return fileArray;
      };
    
  return (
        <div>
            <label className="form-label" htmlFor="customFile">Upload Project</label>
            <button className="form-control" onClick={getPath}>upload project</button>
            <FileTree></FileTree>
            <CodeEditor></CodeEditor>
        </div>
    )
}

export default FileUpload;