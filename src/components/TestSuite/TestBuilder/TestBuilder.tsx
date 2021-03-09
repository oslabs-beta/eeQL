import React, { useContext, useEffect, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import './TestBuilder.scss'
import RestEndpoint from "../RestEndpoint/RestEndpoint"
// import {ReactDOM, render} from 'react-dom'

const { remote } = window.require('electron');
const fs = remote.require('fs')

const TestBuilder = () => {
  const { test, testHandler, resetHandler }: any = useContext(TestContext);
  const { activePort, activeFile, activeFileHandler }: any = useContext(StateContext)
  const [local, localhandler] = useState({});

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
      "headerInfo"
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
    console.log('monaco', activeFile)
  };

  return (
    <div className='test-builder'>
      <RestEndpoint/>
      <br></br>
      {/* Console.log result of test */}
      <button
        type="button"
        className="choices"
        onClick={clicker}
        placeholder="Enter your expected result"
      >
        Build
      </button>

      {/* Update/Preview Test */}
      <button onClick = {() => activeFileHandler()}>Update</button>

      {/* Reset button  */}
      <button className= "resetTestButton" onClick = {resetHandler}>Reset</button>

      {/* save button  */}
      <button className= "saveTestButton" onClick = {()=>console.log("Saving File...")} >Save</button>
      {/* fs.writeFileSync(
      `projectDirectory/__tests__/.insertFileNameHere.test.js`,
      stringRepresentationOfTest,
    ); */}
    </div>
  );
};

export default TestBuilder;
