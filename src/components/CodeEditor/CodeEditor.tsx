import "./CodeEditor.scss";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../provider/StateProvider";
import MonacoEditor from "react-monaco-editor";
import options from "./options";
const { remote } = window.require("electron");
const electronFs = remote.require("fs");

const CodeEditor = () => {
  const { activeFile, fileTree }: any = useContext(StateContext);
  const [update, setUpdate] = useState("");
  const getMonacoFile = (src) => { if (src.length > 0) {
      setUpdate(electronFs.readFileSync(src, "utf8")); }};

  useEffect(() => { getMonacoFile(activeFile); [activeFile, fileTree]});
  return (
    <div id="code-editor-head">
      <div></div>
      <MonacoEditor
        height="55vh"
        width="25vw"
        language="javascript"
        theme="vs-dark"
        options={options}
        value={update}
      />
    </div>
  );
};

export default CodeEditor;
