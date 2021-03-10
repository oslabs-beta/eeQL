import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../provider/StateProvider';
import './FileTree.scss';
// @ts-ignore
import logo from "../../../assets/img/eeQl_logo.png"

// create the file tree and allow a expand/minimize functionality.
// if no files included, 
const FileTree = () => {
  const [folderView, setFolderView] = useState({});
  const { userPath, fileTree, activeFileHandler }: any = useContext(StateContext);
  const projectName = nameSetter(userPath.split('/'))
  const viewValue: {
    [key: string] : Boolean
  } = {};

  function nameSetter(name) {return name[name.length - 1]};
  const viewHandler = (fileName: string): void => {
    folderView[fileName] ? setFolderView({ ...folderView, [fileName]: false}) : 
    setFolderView({ ...folderView, [fileName]: true });
  };

  useEffect(() => {
    setFolderView(viewValue);
  }, []);

  const createTree = (tree) => tree.map((file) => {
    let ext = [(file.name).split('.')[1], (file.name).split('.')[2]]
    if (file.files.length || ext[0] === undefined) {
      viewValue[file.name] = false;
      return (
        <ul key={file.name}>
          <li><button className='file-tree-item' onClick={() => viewHandler(file.name)}><i className="far fa-folder"></i>{" " + file.name}</button></li>
          {folderView[file.name] && createTree(file.files)}
        </ul> 
      );
    } else if (ext[0] == 'js' || ext[1] == 'js') {
    return (
      <ul key={file.path}>
        <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fab fa-js"></i>{" " + file.name}</button></li>
      </ul>
    )
    } else if (ext[0] == 'html') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fab fa-html5"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[0] == 'css') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fab fa-css3"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[0] == 'test') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fas fa-flask"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[0] == 'scss') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fab fa-sass"></i>{" " + file.name}</button></li>
        </ul>
      )
    }
    else if (ext[0] == 'md') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fab fa-readme"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[1] == 'config') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fas fa-code"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[0] == 'json') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fas fa-terminal"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[0] == 'tsx') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="far fa-brackets"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else if (ext[0] == 'png' || ext[0] == 'jpeg' || ext[0] == 'jpg' || ext[0] == 'svc' || ext[0] == 'icn') {
      return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fas fa-image"></i>{" " + file.name}</button></li>
        </ul>
      )
    } else {
    return (
        <ul key={file.path}>
          <li><button className='file-tree-item' onClick={() => {activeFileHandler(file.path)}}><i className="fas fa-file"></i>{' ' + file.name}</button></li>
        </ul>
      )};
  });
  if (userPath.length > 1) {
    return (
    <div id='file-tree-head'>
      <div><i className="fas fa-folder-open"></i>{"  " + projectName}</div>
      <p style={{fontSize: 8, paddingBottom: 10}}>{userPath}</p>
      {createTree(fileTree)}
    </div>)
  } else return (
      <div id='file-tree-head-empty'>
          <div><i className="fas fa-folder"></i>{" EMPTY"}</div>
      </div>) 
};

export default FileTree;
