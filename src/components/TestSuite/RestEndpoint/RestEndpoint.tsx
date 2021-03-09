import React, { useContext, useState } from "react";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import './RestEndpoint.scss'
import Input from '../../../../node_modules/@material-ui/core/Input';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
const { remote } = window.require('electron');

const RestEndpoint = () => {
  const { test, testHandler }: any = useContext(TestContext);
  const { activePort, activeFile, setActiveFile }: any = useContext(StateContext)
  const [local, localhandler] = useState({});
  let current;

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
  const getPath = () => { remote.dialog
    .showOpenDialog({ properties: ['openFile'], message: 'Please choose your server file'})
    .then((files: any) => {
      if (!files.cancelled) {
         current = files.filePaths[0];
        inputHandler(null)}
        })
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
    if (e == null) {
      console.log({'serverApp': current})
      testHandler('serverApp', current)
    } else
    testHandler(e.target.id, (e.target as HTMLInputElement).value);
  };
  
  return (
    <div>
    <i className="fas fa-vial"></i>
    <div id='test-title'>Test Builder</div>
    <div className='rest-endpoint'>


      {/* <h4>Server file name:</h4> */}
      {/* <h4>HTTP method:</h4> */}
      <select
        defaultValue={test.methodSelect || methodOptions[0]}
        id="methodSelect"
        onInput={selectHandler}
      >
        {methodOptions}
      </select>
      {/* <Input placeholder='Select Server File' defaultValue={test.serverApp || ''} fullWidth={false} id="serverApp" type='text' onChange={inputHandler}/> */}
            <div id='server-button'>
            <AwesomeButtonProgress 
                type="secondary"
                ripple={true}
                
                action={(element, next) => {
                    getPath()
                    setTimeout(() => {
                      next();
                    }, 1000);
                    return 
                  }}
                loadingLabel='connecting'
                resultLabel='connected'
                >
                UPLOAD SERVER FILE
            </AwesomeButtonProgress>
            </div>
                {/* <AwesomeButton
                onPress={getPath}
                type='link'
                >✗</AwesomeButton> */}
      {/* <input
        type="text"
        id="serverApp"
        value={test.serverApp || ''}
        onChange={inputHandler}
      /> */}
      {/* <h4>Test Description:</h4> */}
      <Input placeholder='Describe Your Test' fullWidth={true} id="expectedRes" type='text' onChange={inputHandler}/>  
      {/* <input
        type="text"
        id="expectedRes"
        value={test.expectedRes || ''}
        onChange={inputHandler}
      /> */}
      <br></br>

      {/* method select/dropdown */}
      {/* <h4>HTTP method:</h4>
      <select
        defaultValue={test.methodSelect || methodOptions[0]}
        id="methodSelect"
        onInput={selectHandler}
      >
        {methodOptions}
      </select> */}

      <br></br>

      {/* Endpoint input */}
      {/* <h4>Route/Endpoint:</h4> */}
      <Input placeholder='Route/Endpoint' defaultValue={test.desiredEndpoint || ''} fullWidth={true} id="desiredEndpoint" type='text' onChange={inputHandler}/>  
      {/* <input
        type="text"
        id="desiredEndpoint"
        value={test.desiredEndpoint || ''}
        onChange={inputHandler}
      /> */}

      <br></br>
      
      {/* input field for input data */}
      {/* <h4>Input Data:</h4> */}
      <Input placeholder='Input Data' defaultValue={test.inputData || ''} fullWidth={true} id="inputData" type='text' onChange={inputHandler}/>  
      {/* <input
        type="text"
        id="inputData"
        value={test.inputData || ''}
        onChange={inputHandler}
      />

      <br></br> */}

      {/* input field for output data */}
      {/* <h4>Expected Data:</h4> */}
      <Input placeholder='Expected Data' defaultValue={test.outputData || ''} fullWidth={true} id="outputData" type='text' onChange={inputHandler}/>  
      {/* <input
        type="text"
        id="outputData"
        value={test.outputData || ''}
        onChange={inputHandler}
      /> */}

      <br></br>

      {/* input field for header data*/}
      {/* <h4>Header information: </h4> */}
      <Input placeholder='Header' defaultValue={test.headerInfo || ''} fullWidth={true} id="outputData" type='text' onChange={inputHandler}/>  
      {/* <input
        type="text"
        id="headerInfo"
        value={test.headerInfo || ''}
        onChange={inputHandler}
      /> */}

      <br></br>
    </div>
    </div>
  );
};

export default RestEndpoint;
