import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  // let counter = 0;

  const addValue = () => {
    if (counter >= 20) {
      return;
    }
    counter++;
    setCounter(counter);
    console.log(`counter value updated to ${counter}`);
  };

  const removeValue = () => {
    if (counter <= 0) {
      return;
    }
    counter--;
    setCounter(counter);
    console.log(`counter value updated to ${counter}`);
  };

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>
    </>
  );
}

export default App;
