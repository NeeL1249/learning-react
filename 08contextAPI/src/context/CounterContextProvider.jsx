import React from "react";
import { CounterContext } from "./CounterContext";
import { useState } from "react";

const CounterContextProvider = ({ children }) => {
  let [counter, setCounter] = useState(0);
  return (
    <div>
      <CounterContext.Provider value={{ counter, setCounter }}>
        {children}
      </CounterContext.Provider>
    </div>
  );
};

export default CounterContextProvider;
