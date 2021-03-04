/* eslint-disable import/no-unresolved */ // ! Be careful

// REACT LIBRARIES
// eslint-disable-next-line no-use-before-define
import React, { useContext, useEffect, useState } from 'react';
// GLOBAL STATE HANDLERS
import { InputState } from '../../provider/CodeProvider';
//  STYLES
import './FileDirectory.scss';

// Render file tree of uploaded directory on homepage
const FileDirectory = () => {
  const { myPath, fileTree, chosenFileHandler }: any = useContext(InputState);

  // Used with useEffect to update opened and closed folders after first render
  const initialState: { [key: string]: boolean } = {};
  const [isFolderOpen, setFolderOpen] = useState(initialState);

  // Keeps track of opened closed folders upon first render
  const folderOpenObj: { [key: string]: boolean } = {};

  // handler to toggle whether a folder is opened or closed
  const toggleOpenFolder = (fileName: string): void => {
    if (isFolderOpen[fileName]) {
      setFolderOpen({ ...isFolderOpen, [fileName]: false });
    } else setFolderOpen({ ...isFolderOpen, [fileName]: true });
  };

  // After components did mount, set 'isFolderOpen' obj (which is empty) to 'folderOpenObj'
  useEffect(() => {
    setFolderOpen(folderOpenObj);
  }, []);

  // Extract name of file directory/project
  let idx: number;
  if (myPath.lastIndexOf('/') === -1) {
    idx = myPath.lastIndexOf('\\');
  } else {
    idx = myPath.lastIndexOf('/');
  }
  const projectName: string = myPath.substring(idx + 1);

  // Recursively create a file tree from uploaded file directory
  const renderFileTree = (tree) => tree.map((file) => {
    // If current element being mapped over is a folder, do the following...
    if (file.files.length) {
      folderOpenObj[file.fileName] = false;
      return (
        <ul key={file.fileName}>
          <li>
            {/* Folder represented as a button that can be open/closed */}
            <button
              id="filesButtonFolder"
              type="button"
              onClick={() => toggleOpenFolder(file.fileName)}
            >
              {file.fileName}
            </button>
          </li>
          {isFolderOpen[file.fileName] && renderFileTree(file.files)}
        </ul>
      );
    }
    // If current element being mapped over is a file, do the following...
    return (
      <ul key={file.filePath}>
        <li>
          {/* Files represented as a button that can be selected */}
          <button
            id="filesButtonFile"
            type="button"
            onClick={() => {
              chosenFileHandler(file.filePath);
            }}
          >
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            - {file.fileName}
          </button>
        </li>
      </ul>
    );
  });

  // If a directory has been uploaded, display the file tree, otherwise display 'No Files Uploaded'
  return (
    <div id="fileTreeMainCont">
      {/* Ternary operator to only render tree if it exists */}
      {fileTree.length ? (
        <>
          <div id="fileName">{projectName}</div>
          <section id="fileTreeCont">{renderFileTree(fileTree)}</section>
        </>
      )
        : (
          <div>No Files Uploaded</div>
          // If no tree, show above header
        )}
    </div>
  );
};

export default FileDirectory;
