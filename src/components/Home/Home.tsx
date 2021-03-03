/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */ // ! Be careful

import React, { useContext } from 'react';
import { InputState } from '../../provider/CodeProvider';
const fs = require ('fs');

const path = require('path');
const { remote } = window.require('electron');
const { fileSystem } = remote.require('fs')
let current: string = '';
let readDir;
let filterArray: Array<string> = [];


const Home = () => {
    // destructuring state/useState methods from Context
    const { fileTreeHandler, pathHandler }: any = useContext(InputState);

    const readDirectory = async () => {
       readDir = await fs.readdirSync(current)
    }
    const getFilePath = () => {
        remote.dialog
        .showOpenDialog({properties: ['openDirectory'],
        message: 'Please choose your project folder'})
        .then((files: any) => {
            if (!files.cancelled) {
            current = files.filePaths[0];
            }
        })
    }
    async function test() {
        const getFilePath = () => {
            remote.dialog
            .showOpenDialog({properties: ['openDirectory'],
            message: 'Please choose your project folder'})
            .then((files: any) => {
                if (files.cancelled == 'false') {
                current = files.filePaths[0];
                }
            })
        }
        getFilePath();
    }
    const pathFinder = (path) => {
        new Promise((resolve, reject) => {
            readDir = fs.readdir(path, (err, filenames) => err !== null ? reject(err) : resolve(filenames))
        })
        console.log(readDir)
     }

    return (
        <div>
            {/* <button onClick={getFilePath}>file</button>
            <button onClick={readDirectory}>read</button> */}
            <button onClick={test}>test</button>
            <button onClick={pathFinder}>test</button>
        </div>
    )

}

export default Home;