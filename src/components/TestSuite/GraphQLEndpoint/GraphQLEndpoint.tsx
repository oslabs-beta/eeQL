import React, { useState, useContext} from "react";
// import GraphQL from "graphql";
// @ts-ignore
import { ApolloClient, InMemoryCache, ApolloProvider, HTTPLink, gql, from } from "@apollo/client/core";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import Input from '../../../../node_modules/@material-ui/core/Input';
// @ts-ignore
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
const { remote } = window.require('electron');
const GraphQl = () => {
    const { test, testHandler }: any = useContext(TestContext);
    const { activePort, activeFile, setActiveFile }: any = useContext(StateContext)
    const [local, localhandler] = useState({});
    let current;

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
    const getSchemaPath = () => { remote.dialog
        .showOpenDialog({ properties: ['openFile'], message: 'Please choose your schema file'})
        .then((files: any) => {
          if (!files.cancelled) {
             current = files.filePaths[0];
            inputHandler(undefined)}
            })
          }        

    const selectHandler = (e: any): void => {
      const dropdownId = e.target.id;
      const dropdown = document.getElementById(dropdownId) as HTMLSelectElement;
      const selection = dropdown.options[dropdown.selectedIndex].text;
      testHandler(dropdownId, selection);
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e == null) {
        console.log({'serverApp': current})
        testHandler('serverApp', current)
      } else if (e == undefined) {
        console.log({'schemaApp': current})
        testHandler('schemaApp', current)
      } else
      testHandler(e.target.id, (e.target as HTMLInputElement).value);
    };
    
    return (
      <div>
      <i className="fas fa-vial"></i>
      <div id='test-title'>Test Builder</div>
      <div className='rest-endpoint'>
        <select
          defaultValue={test.methodSelect || methodOptions[0]}
          id="methodSelect"
          onInput={selectHandler}>
          {methodOptions}
        </select>
        <b></b>
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
              <AwesomeButtonProgress 
                  type="secondary"
                  ripple={true}
                  
                  action={(element, next) => {
                    getSchemaPath()
                      setTimeout(() => {
                        next();
                      }, 1000);
                      return 
                    }}
                  loadingLabel='connecting'
                  resultLabel='connected'
                  >
                  UPLOAD SCHEMA FILE
              </AwesomeButtonProgress>
              <Input placeholder='Database URI' fullWidth={true} id="URI" type='password' onChange={inputHandler}/>  
              </div>
        <br/>
        <br/>
        <Input placeholder='Describe Your Test' fullWidth={true} id="expectedRes" type='text' onChange={inputHandler}/>  
        <Input placeholder='Route/Endpoint' defaultValue={test.desiredEndpoint || ''} fullWidth={true} id="desiredEndpoint" type='text' onChange={inputHandler}/>  
        <Input placeholder='Query Input' defaultValue={test.inputData || ''} fullWidth={true} id="inputData" type='text' onChange={inputHandler}/>  
        <Input placeholder='Expected Data' defaultValue={test.outputData || ''} fullWidth={true} id="outputData" type='text' onChange={inputHandler}/>  
        <Input placeholder='Header' defaultValue={test.headerInfo || ''} fullWidth={true} id="outputData" type='text' onChange={inputHandler}/>  
        <br></br>
      </div>
      </div>
    );
  };


export default GraphQl;




//InMemoryCache normalizes query response objects before it saves them to its internal data store
//InMemoryCache generates a unique identifier for any object that includes a __typename field


// export const client = new ApolloClient({
// URI: 'http://localhost:8080',
// cache: new InMemoryCache(),
// onError: (e)=> {console.log('The error is :', e)}
// })

// //TEST
// describe(`${test}`, ()=>{
// it($`{test.expectedRes}`, async()=>{
// // create a  GraphQLSchema instance using the function makeExecutableSchema

// //assign variable to the value of reading schema using fs.readFileSync
// const readSchema = fs.readFileSync('users graphql schema', utf8)
// //assign variable to the value of the schema and resolvers  combined using makeExecutableSchema
// const finalSchema = makeExecutableSchema({readSchema, resolvers})
// //   await 
// })

// )


// })

