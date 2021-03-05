import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../provider/StateProvider';
import './FileTree.scss';

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
    if (file.files.length) {
      viewValue[file.name] = false;
      return (
        <ul key={file.name}>
          <li><button onClick={() => viewHandler(file.name)}>[] - {file.name}</button></li>
          {folderView[file.name] && createTree(file.files)}
        </ul>
      );
    }
    return (
      <ul key={file.path}>
        <li><button onClick={() => {activeFileHandler(file.path)}}>{file.name}</button></li>
      </ul>
    );
  });
  if (userPath.length > 1) {
    return (
    <div>
      <div>{projectName}</div>
      {createTree(fileTree)}
    </div>)
  } else return (
      <div>
        no files uploaded
      </div>) 
};

export default FileTree;
