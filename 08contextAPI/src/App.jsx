import { useState, useContext } from "react";
import CounterContextProvider from "./context/CounterContextProvider";
import { Counter, CounterChange } from "./components";

function App() {
  return (
    <>
      <CounterContextProvider>
        <Counter />
        <CounterChange />
      </CounterContextProvider>
    </>
  );
}

export default App;
