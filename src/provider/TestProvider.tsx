import React, { useState } from "react";

//create init state w/ empty object
export const TestContext = React.createContext({});
//create handler that can edit state w/ user input

//initial state
const TestProviders = ({ children }: any) => {
  const [test, setTest] = useState({});

  const [monaco, monacoPoster] = useState('');

  //handler for all states with  k-v's that are added/updated
  const testHandler = (altKey: string, altValue: any) => {
    setTest({ ...test, [altKey]: altValue });
    console.log(altKey, altValue, 'updatedState: ',test);
  };

  const resetHandler = () =>{
    setTest({});
  }

  return (
    <TestContext.Provider
      value={{
        test,
        testHandler,
        monaco,
        monacoPoster,
        resetHandler
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export default TestProviders;
