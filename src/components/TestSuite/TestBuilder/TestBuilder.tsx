import React, { useContext, useEffect, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import './TestBuilder.scss'
import RestEndpoint from "../RestEndpoint/RestEndpoint"
// import {ReactDOM, render} from 'react-dom'
// @ts-ignore
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';

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
      <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={clicker}
      >
        BUILD
      </AwesomeButton>

      {/* Update/Preview Test */}
      <AwesomeButton
        size='small' 
        type="secondary"
        ripple={true}
        onPress={() => activeFileHandler()}
      >
        UPDATE
      </AwesomeButton>
      {/* Reset button  */}
      <AwesomeButton
        size='small' 
        type="link"
        ripple={true}
        onPress={resetHandler}
      >
        RESET
      </AwesomeButton>
      {/* save button  */}
      <AwesomeButtonProgress
        size='small' 
        type="Primary"
        ripple={true}
        loadingLabel='...'
        resultLabel='✓'
        action={(element, next) => {
          console.log('clicked');
          setTimeout(() => {
            next();
          }, 600);}}
      >
        SAVE
      </AwesomeButtonProgress>
      {/* fs.writeFileSync(
      `projectDirectory/__tests__/.insertFileNameHere.test.js`,
      stringRepresentationOfTest,
    ); */}
    </div>
  );
};

export default TestBuilder;
