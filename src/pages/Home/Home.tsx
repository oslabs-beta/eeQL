import React, { useContext } from "react";
import GridLayout from "react-grid-layout";
import "./Home.scss";

import CodeEditor from "../../components/CodeEditor/CodeEditor";
import FileTree from "../../components/FileTree/FileTree";
import NavBar from "../../components/NavBar/NavBar";
import TestBuilder from "../../components/TestSuite/TestBuilder/TestBuilder";
import { StateContext } from "../../provider/StateProvider";

const Home = () => {
  //added state context
  const { activePortHandler }: any = useContext(StateContext);

  return (
    <div className="home-border">
      <NavBar></NavBar>
      <div className="grid-border">
        <div className="file">
          <FileTree />
        </div>
        <div className="test">
          <TestBuilder />
        </div>
        <div className="code">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default Home;
