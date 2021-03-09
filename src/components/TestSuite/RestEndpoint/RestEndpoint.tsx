import React, { useContext, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import './RestEndpoint.scss'

const RestEndpoint = () => {
  const { test, testHandler }: any = useContext(TestContext);
  const { activePort, activeFile, setActiveFile }: any = useContext(StateContext)
  const [local, localhandler] = useState({});

  //Add methods to methodOptions array, and create options to be rendered in select/dropdown element
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const methodOptions = [];
  for (let a = 0; a < methods.length; a++) {
    methodOptions.push(
      <option key={`${a} + method`} value={methods[a]}>
        {methods[a]}
      </option>
    );
  }

  //handler for state to reflect entires in a select tag
  const selectHandler = (e: any): void => {
    const dropdownId = e.target.id;
    const dropdown = document.getElementById(dropdownId) as HTMLSelectElement;
    const selection = dropdown.options[dropdown.selectedIndex].text;
    testHandler(dropdownId, selection);
  }

  //handler for state to reflect entries in an input tag
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    testHandler(e.target.id, (e.target as HTMLInputElement).value);
  };
  
  return (
    <div className='rest-endpoint'>
      <h4>Server file name:</h4>
      <input
        type="text"
        id="serverApp"
        value={test.serverApp || ''}
        onChange={inputHandler}
      />

      <h4>Test Description:</h4>
      <input
        type="text"
        id="expectedRes"
        value={test.expectedRes || ''}
        onChange={inputHandler}
      />
      <br></br>

      {/* method select/dropdown */}
      <h4>HTTP method:</h4>
      <select
        defaultValue={test.methodSelect || methodOptions[0]}
        id="methodSelect"
        // defaultValue={methods[0]}
        onInput={selectHandler}
      >
        {methodOptions}
      </select>

      <br></br>

      {/* Endpoint input */}
      <h4>Route/Endpoint:</h4>
      <input
        type="text"
        id="desiredEndpoint"
        value={test.desiredEndpoint || ''}
        onChange={inputHandler}
      />

      <br></br>
      
      {/* input field for input data */}
      <h4>Input Data:</h4>
      <input
        type="text"
        id="inputData"
        value={test.inputData || ''}
        onChange={inputHandler}
      />

      <br></br>

      {/* input field for output data */}
      <h4>Expected Data:</h4>
      <input
        type="text"
        id="outputData"
        value={test.outputData || ''}
        onChange={inputHandler}
      />

      <br></br>

      {/* input field for header data*/}
      <h4>Header information: </h4>
      <input
        type="text"
        id="headerInfo"
        value={test.headerInfo || ''}
        onChange={inputHandler}
      />

      <br></br>
    </div>
  );
};

export default RestEndpoint;
