/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { InputState } from '../../provider/CodeProvider';


const path = require('path');
const { remote } = window.require('electron');
const { fileSystem } = remote.require('fs')
let current: string = '';


const Home = () => {
    const { fileTreeHandler, generateFileTree, pathHandler }: any = useContext(InputState);
    console.log(fileSystem)
    console.log(remote)

    function test() {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            current = files.filePaths[0];
            fileTreeHandler(generateFileTree(current));
            pathHandler(files.filePaths[0]);
        })
    }
    return (
        <div>
            <button onClick={test}>yes</button>
        </div>
    )

}

export default Home;