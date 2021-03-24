import React, { useContext, useEffect, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import "./TestBuilder.scss";
import RestEndpoint from "../RestEndpoint/RestEndpoint";
import GraphQl from "../GraphQLEndpoint/GraphQLEndpoint";
import RestTestCreation from "../TestGeneration/RestTestCreation";
import graphQLTestCreation from "../TestGeneration/graphQLTestCreation"
import Input from "../../../../node_modules/@material-ui/core/Input";
import FileUpdate from "../../FileUpdate/FileUpdate"

// import {ReactDOM, render} from 'react-dom'
// @ts-ignore
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";


const { remote } = window.require("electron");
const fs = remote.require("fs");
let directoryArray;
let fileArray;

const TestBuilder = () => {
  const { test, testHandler, resetHandler }: any = useContext(TestContext);
  const {
    userPath,
    activeFile,
    activeFileHandler,
    updateTreeHandler,
    fileTreeHandler,
    pathHandler,
    fileTree,
    updateTree,
  }: any = useContext(StateContext);
  const [local, localhandler] = useState(true);
  const [testName, testNameHandler] = useState('');

  const generateFileTree = (dir) => {
    let getDirectory = (current) => {
      directoryArray = fs
        .readdirSync(current)
        .filter((file) => file !== "node_modules" && file[0] !== ".");
      if (directoryArray.filter((file, i) => !file.includes("")) == []) {
        return directoryArray;
      }
    };
    getDirectory(dir);

    fileArray = directoryArray.map((name: string) => {
      let path = dir;
      path = `${path}/${name}`;
      const file: any = { path, name, files: [] };

      if (!file.name.includes(".")) {
        file.files = generateFileTree(file.path);
      }
      return file;
    });
    fileTreeHandler(fileArray);
    return fileArray;
  };

  const clicker = () => {
    // gather current value from all fields.
    // serverApp, expectedRes, methodSelect, desiredEndpoint, inputData, outputData, headerInfo
    let selectFieldsArray = ["methodSelect"];

    let inputFieldsArray = [
      "serverApp",
      "expectedRes",
      "desiredEndpoint",
      "inputData",
      "outputData",
      "headerInfo",
    ];
    // iterate through all dropdowns (select is the formal name) to extract current selected value, and store that selection in our state
    for (let i = 0; i < selectFieldsArray.length; i++) {
      const dropDown = document.getElementById(
        selectFieldsArray[i]
      ) as HTMLSelectElement;
      const selection = dropDown.options[dropDown.selectedIndex].text;
      testHandler(selectFieldsArray[i], selection);
    }
    console.log("state after select fields loop", test);

    for (let j = 0; j < inputFieldsArray.length; j++) {
      const inputField = document.getElementById(inputFieldsArray[j]);
      const inputValue = inputField.innerText ? inputField.innerText : "qwerty";
      testHandler(inputFieldsArray[j], inputValue);
    }

    console.log(test);
    console.log("monaco", activeFile);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // if (e == null) {
    //   console.log({ serverApp: current });
    //   testHandler("serverApp", current);
    // } else if (e == undefined) {
    //   console.log({ schemaApp: current });
    //   testHandler("schemaApp", current);
    // } else 
    testHandler(e.target.id, (e.target as HTMLInputElement).value);
  };

  const handleSaveTest = () => {
    
    const createTest = (local) ? RestTestCreation(test) : graphQLTestCreation(test);
    console.log(createTest);
    fs.writeFileSync(
      `${userPath}/__tests__/${test.testFileName}.js`,
      createTest,
      {
        encoding: "utf8",
      }
    );
  };

  // if (local) {
    return (
      <div className="test-builder">
        <Input
          placeholder="Test File Name"
          // defaultValue='/graphql'
          defaultValue={test.testFileName || ""}
          fullWidth={true}
          id="testFileName"
          type="text"
          onChange={inputHandler}
        />
        <AwesomeButton
          size="small"
          type="Primary"
          ripple={true}
          onPress={() => localhandler(true)}
        >
          REST
        </AwesomeButton>
        <AwesomeButton
          size="small"
          type="Primary"
          ripple={true}
          onPress={() => localhandler(false)}
        >
          GRAPHQL
        </AwesomeButton>
        
        {/* conditionally render the form for building Rest or GraphQL tests */}
        {
          (local) ? <RestEndpoint /> : <GraphQl/>
        }
        <br></br>
        {/* save button  */}
        <AwesomeButtonProgress
          size="small"
          type="Primary"
          ripple={true}
          loadingLabel="..."
          resultLabel="✓"
          action={(element, next) => {
            console.log("Saving Test...");
            handleSaveTest();
            generateFileTree(userPath);
            setTimeout(() => {
              next();
            }, 1000);
          }}
        >
          SAVE
        </AwesomeButtonProgress>
      </div>
    );
};

export default TestBuilder;
