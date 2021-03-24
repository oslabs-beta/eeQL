import React, { useState, useContext } from "react";
// import GraphQL from "graphql";
// @ts-ignore
import { ApolloClient, InMemoryCache, ApolloProvider, HTTPLink, gql, from } from "@apollo/client/core";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import Input from "../../../../node_modules/@material-ui/core/Input";
import "./GraphQLEndpoint.scss";
// @ts-ignore
import { AwesomeButtonProgress } from "react-awesome-button";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

const { remote } = window.require("electron");
const GraphQl = () => {
  const { test, testHandler }: any = useContext(TestContext);
  const { activePort, activeFile, setActiveFile }: any = useContext(
    StateContext
  );
  const [operationIsMutation, setoperationIsMutation] = useState(false);
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
  const getSchemaPath = () => {
    remote.dialog
      .showOpenDialog({
        properties: ["openFile"],
        message: "Please choose your schema file",
      })
      .then((files: any) => {
        if (!files.cancelled) {
          current = files.filePaths[0];
          testHandler("schemaFile", current);
        }
      });
  };

  const getResolverPath = () => {
    remote.dialog
      .showOpenDialog({
        properties: ["openFile"],
        message: "Please choose your resolver file",
      })
      .then((files: any) => {
        if (!files.cancelled) {
          current = files.filePaths[0];
          testHandler("resolverFile", current);
        }
      });
  };

  // const selectHandler = (e: any): void => {
  //   const dropdownId = e.target.id;
  //   const dropdown = document.getElementById(dropdownId) as HTMLSelectElement;
  //   const selection = dropdown.options[dropdown.selectedIndex].text;
  //   testHandler(dropdownId, selection);
  // };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e == null) {
      console.log({ schemaFile: current });
      testHandler("schemaFile", current);
    } else if (e == undefined) {
      console.log({ resolverFile: current });
      testHandler("resolverFile", current);
    } else testHandler(e.target.id, (e.target as HTMLInputElement).value);
  };

  const gqlOperationHandler = (): void => {
    setoperationIsMutation(!operationIsMutation)
    testHandler("operationIsMutation", operationIsMutation);
  }


  //color change for switch
  const GreenSwitch = withStyles({
    switchBase: {
      color: green[300],
      '&$checked': {
        color: green[500],
      },
      '&$checked + $track': {
        backgroundColor: green[500],
      },
    },
    checked: {},
    track: {},
  }

  )(Switch)



  return (
    <div>
      {/* <br/> */}
      <i className="fas fa-vial"></i>
      <div id="test-title">Test Builder</div>
      {/* <br/> */}
      <div className="rest-endpoint">
        {/* <select
          defaultValue={test.methodSelect || methodOptions[0]}
          id="methodSelect"
          onInput={selectHandler}
        >
          {methodOptions[1]}
        </select> */}
        <div id="server-button">
          {/* <AwesomeButtonProgress
            type="secondary"
            ripple={true}
            action={(element, next) => {
              getPath();
              setTimeout(() => {
                next();
              }, 1000);
              return;
            }}
            loadingLabel="connecting"
            resultLabel="connected"
          >
            UPLOAD SERVER FILE
          </AwesomeButtonProgress> */}
          <AwesomeButtonProgress
            type="secondary"
            ripple={true}
            action={(element, next) => {
              getSchemaPath();
              setTimeout(() => {
                next();
              }, 1000);
              return;
            }}
            loadingLabel="connecting"
            resultLabel="connected"
          >
            UPLOAD SCHEMAS
          </AwesomeButtonProgress>
          <AwesomeButtonProgress
            type="secondary"
            ripple={true}
            action={(element, next) => {
              getResolverPath();
              setTimeout(() => {
                next();
              }, 1000);
              return;
            }}
            loadingLabel="connecting"
            resultLabel="connected"
          >
            UPLOAD RESOLVERS
          </AwesomeButtonProgress>
          <br />
        </div>
        <Input
          placeholder="Describe Your Test"
          fullWidth={true}
          id="expectedRes"
          type="text"
          onChange={inputHandler}
        />
        <br />
        {/* <Input
          // placeholder="/graphql"
          defaultValue='/graphql'
          // defaultValue={test.desiredEndpoint || ""}
          fullWidth={true}
          id="desiredEndpoint"
          disabled={true}
          type="text"
        /> */}
        {/* <br/> */}
        <Input
          placeholder={`Enter Your Query/Mutation: ${'\n'}${'\n'} query: { users { id, name } } ${'\n'} mutation: { users { id, name } }`}
          fullWidth={true}
          id="gqlOperationText"
          type="text"
          multiline={true}
          rows={4}
          onChange={inputHandler}
        />

        {/* <Input
          placeholder="Query Input"
          defaultValue={test.inputData || ""}
          fullWidth={true}
          id="inputData"
          type="text"
          onChange={inputHandler}
        /> */}
        {/* <br/> */}

        <Grid component="label" container alignItems="center" justify="center" spacing={1}>
          <Grid item>Query</Grid>
          <Grid item>

            <Switch
              checked={operationIsMutation}
              onChange={gqlOperationHandler}
              id="operationIsMutation"
            />
          </Grid>
          <Grid item>Mutation</Grid>
        </Grid>

        {/* <br/> */}
        {/* conditionally render box where user enters data to be fed to the mutation.  */}
        {(operationIsMutation) ?

          <Input
            placeholder="Mutation Object with fields of input"
            defaultValue={test.mutationObject || ""}
            fullWidth={true}
            id="mutationObject"
            type="text"
            multiline={true}
            rows={3}
            onChange={inputHandler}
          />
          :
          null
        }
        {/* <Input
          placeholder="Header"
          defaultValue={test.headerInfo || ""}
          fullWidth={true}
          id="outputData"
          type="text"
          onChange={inputHandler}
        /> */}
        <br></br>
      </div>
    </div>
  );
};

export default GraphQl;