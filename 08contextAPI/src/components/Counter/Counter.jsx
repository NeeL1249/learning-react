import React from "react";
import { useContext } from "react";
import { CounterContext } from "../../context/CounterContext";

const Counter = () => {
  const { counter } = useContext(CounterContext);
  return (
    <div className="p-4 m-4 text-center">
      <p className="text-lg font-semibold mb-4">Counter is: {counter}</p>
    </div>
  );
};

export default Counter;
