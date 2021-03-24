import React, { useState, useContext } from "react";
// import GraphQL from "graphql";
// @ts-ignore
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";
import Input from "../../../../node_modules/@material-ui/core/Input";
import "./GraphQLEndpoint.scss";
// @ts-ignore
import { AwesomeButtonProgress } from "react-awesome-button";

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
  const [operationIsMutation, setOperationIsMutation] = useState(false);
  const [operationIsValid, setOperationIsValid] = useState(false);

  // variable denoting current file in file operations
  let current;


  // handler for adding schema path to state 
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

  // handler for adding resolver path to state 
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

  // handler for adding data from input fields to state
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e == null) {
      console.log({ schemaFile: current });
      testHandler("schemaFile", current);
    } else if (e == undefined) {
      console.log({ resolverFile: current });
      testHandler("resolverFile", current);
    } else testHandler(e.target.id, (e.target as HTMLInputElement).value);
  };

  // handler for query/mutation switch
  const gqlOperationHandler = (): void => {
    setOperationIsMutation(!operationIsMutation)
    testHandler("operationIsMutation", operationIsMutation);
  }

  // handler for valid/invalid query switch 
  const validOperationHandler = (): void => {
    setOperationIsValid(!operationIsValid)
    testHandler("operationIsValid", operationIsValid);
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
      <i className="fas fa-vial"></i>
      <div id="test-title">GraphQL Test Builder</div>
      <div className="rest-endpoint">
        <div id="server-button">
          {/* button to upload schemas */}
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
          {/* button to upload resolvers */}
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
        {/* input for describe/it description  */}
        <Input
          placeholder="Describe Your Test"
          fullWidth={true}
          id="expectedRes"
          type="text"
          onChange={inputHandler}
        />

        {/* switch for valid/invalid operation */}
        <Grid component="label" container alignItems="center" justify="center" spacing={1}>
          <Grid item>Valid Operation</Grid>
          <Grid item>
            <Switch
              checked={operationIsValid}
              onChange={validOperationHandler}
              id="operationIsValid"
            />
          </Grid>
          <Grid item>Invalid Operation</Grid>
        </Grid>
        
        {/* input for query/mutation text */}
        <Input
          placeholder={`Enter Your Query/Mutation: ${'\n'}${'\n'} query: { users { id, name } } ${'\n'} mutation: { users { id, name } }`}
          fullWidth={true}
          id="gqlOperationText"
          type="text"
          multiline={true}
          rows={4}
          onChange={inputHandler}
        />
        
        {/* switch for query/mutation */}
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

        {/* conditionally render input where user enters data to be fed to the mutation.  */}
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
        <br></br>
      </div>
    </div>
  );
};

export default GraphQl;