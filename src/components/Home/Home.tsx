/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { render } from 'react-dom';
import { InputState } from '../../provider/CodeProvider';
// const fs = require ('fs');
import FileDirectory from '../FileDirectory/FileDirectory'

const path = require('path');
const { remote } = window.require('electron');
const fs = remote.require('fs')
let current: string = '';
let filterArray;
let fileArray;

const Home = () => {
    const { fileTreeHandler, pathHandler, fileTree}: any = useContext(InputState);
    const getFilePath = () => {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            if (!files.cancelled) {
                pathHandler(files.filePaths[0]);
                current = files.filePaths[0]
                generateFileTree(current)
            }
        })
    }
      const generateFileTree = (dir) => {
        let getDirectory = (current) => {
            filterArray = fs.readdirSync(current).filter(file => file !== 'node_modules' && file[0] !== '.');
            if (filterArray.filter((file, i) => !file.includes('')) == []) {
                return filterArray 
            } 
        }
        getDirectory(dir)
        fileArray = filterArray.map(
          (fileName: string) => {
            let filePath = dir
            filePath = `${filePath}/${fileName}`;
            const file: any = {
              filePath,
              fileName,
              files: [],
            };
              if (!file.fileName.includes('.')) {
                file.files = generateFileTree(file.filePath);
              }
            return file;
          },
        );
        return fileArray;
      };
    return (
        <div>
            <label className="form-label" htmlFor="customFile">Upload Project</label>
            {/* <input type="file"  id="customFile" onClick={getFilePath}/> */}
            <button className="form-control" onClick={getFilePath}>upload project</button>
            <button onClick={() => fileTreeHandler(fileArray)}>set</button>
            <button onClick={() => console.log(typeof fileTree)}>get</button>
            <FileDirectory></FileDirectory>
            {/* <div>{fileTree}</div> */}
        </div>
    )
}

export default Home;