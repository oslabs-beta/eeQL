import React, { useState } from "react";

//create init state w/ empty object
export const DataContext = React.createContext({});
//create handler that can edit state w/ user input

//initial state
const DataProviders = ({ children }: any) => {
  const [database, setData] = useState("test");

  //handler for all states with  k-v's that are added/updated
  const dataHandler = (ref) => {
    setData(ref);
  };

  return (
    <DataContext.Provider
      value={{
        database,
        dataHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProviders;
