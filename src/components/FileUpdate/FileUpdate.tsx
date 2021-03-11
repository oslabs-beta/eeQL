/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext, useState } from 'react';
import { StateContext } from '../../provider/StateProvider';
import { Link } from 'react-router-dom';
// @ts-ignore
import "react-awesome-button/dist/styles.scss";
import './FileUpdate.scss'
// @ts-ignore
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';

const { remote } = window.require('electron');
const fs = remote.require('fs')
let current: string = '';
let directoryArray;
let fileArray;


const FileUpdate = () => {
    function nameSetter(name) {return name[name.length - 1]};
    const { userPath, fileTreeHandler, pathHandler, fileTree}: any = useContext(StateContext);
    const { activePortHandler }: any = useContext(StateContext);
    const projectName = nameSetter(userPath.split('/'))

    const setPort = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        activePortHandler(e.target.value)
    }
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
    <div id='file-upload-footer'>
        <div id='file-upload-head'>
              
                <AwesomeButtonProgress 
                size='small'
                type="secondary"
                ripple={true}
                action={(element, next) => {
                    getPath()
                    next()
                    return 
                  }}
                loadingLabel='...'
                resultLabel={projectName}
                >
                {projectName}
                </AwesomeButtonProgress>
                <AwesomeButton
                onPress={getPath}
                size='small'
                type='link'
                >⟳</AwesomeButton>
                {/* <Input placeholder='8080 ' type='number' onChange={(e) => setPort(e)} inputProps={{ 'aria-label': 'description' }} /> */}
        </div>
  </div>
    )
}

export default FileUpdate;