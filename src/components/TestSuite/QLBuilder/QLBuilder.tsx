import React, { useContext, useEffect, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import './TestBuilder.scss'
import RestEndpoint from "../RestEndpoint/RestEndpoint"
import GraphQl from '../GraphQLEndpoint/GraphQLEndpoint'
import RestTestCreation from "../TestGeneration/RestTestCreation"
// import {ReactDOM, render} from 'react-dom'
// @ts-ignore
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';

const { remote } = window.require('electron');
const fs = remote.require('fs')
const TestBuilder = () => {
  const { test, testHandler, resetHandler }: any = useContext(TestContext);
  const { userPath, activePort, activeFile, activeFileHandler }: any = useContext(StateContext)
  const [local, localhandler] = useState(true);

  const clicker = () => {
    // gather current value from all fields.
    // serverApp, expectedRes, methodSelect, desiredEndpoint, inputData, outputData, headerInfo
    let selectFieldsArray = ["methodSelect"];

    let inputFieldsArray = [
      "serverApp",
      "schemaApp",
      "URI",
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

  const handleSaveTest = () => {
    const restTest = RestTestCreation(test)
    console.log(restTest);
    fs.writeFileSync(
      `${userPath}/__tests__/insertFileNameHere.test.js`,
      restTest,
      {
        encoding: "utf8",
      }
      );
  }

  if (local){ return (
    <div className='test-builder'>
      <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={ () =>
          localhandler(true)
        }
      >
        REST
      </AwesomeButton>
      <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={ () =>
          localhandler(false)
        }
      >
        GRAPHQL
      </AwesomeButton>
      <RestEndpoint/>
      <br></br>
      {/* Console.log result of test */}
      <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={async () => {
          let file = await fs.writeFileSync(
          `${userPath}/__tests__/test.js`,
          RestTestCreation(test));
          activeFileHandler(`${userPath}/__tests__/test.js`)
        }}
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
          console.log('Saving Test...');
          handleSaveTest();
          setTimeout(() => {
            next();
          }, 1000);}}
      >
        SAVE
      </AwesomeButtonProgress>
    </div>
  );
}
else {
  return (
    <div className='test-builder'>
            <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={ () =>
          localhandler(true)
        }
      >
        REST
      </AwesomeButton>
      <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={ () =>
          localhandler(false)
        }
      >
        GRAPHQL
      </AwesomeButton>
      <GraphQl/>
      <br></br>
      {/* Console.log result of test */}
      <AwesomeButton
        size='small' 
        type="Primary"
        ripple={true}
        onPress={async () => {
          let file = await fs.writeFileSync(
          `${userPath}/__tests__/test.js`,
          RestTestCreation(test));
          activeFileHandler(`${userPath}/__tests__/test.js`)
        }}
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
          console.log('Saving Test...');
          handleSaveTest();
          setTimeout(() => {
            next();
          }, 1000);}}
      >
        SAVE
      </AwesomeButtonProgress>
    </div>
  );

}
};

export default TestBuilder;