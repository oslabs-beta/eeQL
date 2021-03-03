/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { InputState } from '../../provider/CodeProvider';
// const fs = require ('fs');

const path = require('path');
const { remote } = window.require('electron');
const fs = remote.require('fs')
let current: string = '';
let readDir;


const Home = () => {
    // destructuring state/useState methods from Context
    const { fileTreeHandler, pathHandler }: any = useContext(InputState);
    const fileTree = () => {
    const getFilePath = () => {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            if (!files.cancelled) {
            current = files.filePaths[0];
            getDirectory()
            }
        })
    }
    getFilePath()
    let getDirectory = () => {
        const filterArray = fs.readdirSync(current)
        console.log('filepath', current)
        console.log('array of files', filterArray)
        }
}
    return (
        <div>
            {/* <button onClick={getFilePath}>file</button>
            <button onClick={readDirectory}>read</button> */}
            <button onClick={fileTree}>test</button>
        </div>
    )

}

export default Home;