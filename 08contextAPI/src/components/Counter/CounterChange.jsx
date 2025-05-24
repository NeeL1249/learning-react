import React from "react";
import { useContext } from "react";
import { CounterContext } from "../../context/CounterContext";

const CounterChange = () => {
  let { counter, setCounter } = useContext(CounterContext);
  return (
    <div className="p-4 font-sans text-center">
      <div className="space-x-4">
        <button
          onClick={() => setCounter(counter + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Increment
        </button>
        <button
          onClick={() => setCounter(counter - 1)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default CounterChange;
