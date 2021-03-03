/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { render } from 'react-dom';
import { InputState } from '../../provider/CodeProvider';
// const fs = require ('fs');

const path = require('path');
const { remote } = window.require('electron');
const fs = remote.require('fs')
let current: string = '';
let filterArray;
let fileArray;

const Home = () => {
    const { fileTreeHandler, pathHandler, fileTree, myPath }: any = useContext(InputState);
    const getFilePath = () => {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            if (!files.cancelled) {
                pathHandler(files.filePaths[0]);
                current = files.filePaths[0]
                console.log(current)
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
            {/* <label className="form-label" htmlFor="customFile">Default file input example</label>
            <input type="file" className="form-control" id="customFile" /> */}
            <button onClick={getFilePath}>test</button>
            <button onClick={() => fileTreeHandler(fileArray)}>set</button>
            <button onClick={() => console.log(fileTree)}>get</button>
        </div>
    )
}

export default Home;