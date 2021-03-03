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
let readDir;
let fileTree = [];


const Home = () => {
    // destructuring state/useState methods from Context
    const { fileTreeHandler, pathHandler }: any = useContext(InputState);
    const fileTreeCreator = () => {
    const getFilePath = () => {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            if (!files.cancelled) {
            current = files.filePaths[0];
            getDirectory(current)
            }
        })
    }
    getFilePath()
    let getDirectory = (current) => {
        const filterArray = fs.readdirSync(current).filter(file => file !== 'node_modules' && file[0] !== '.');
        fileTree = filterArray
        console.log('filepath', current)
        console.log('array of files', filterArray)
        fileSorter()
        }

    let fileSorter = () => {
        console.log(fileTree.filter(file => !file.includes('.'))
    }
    
}

    return (
        <div>
            <button onClick={fileTreeCreator}>test</button>
        </div>
    )

}

export default Home;