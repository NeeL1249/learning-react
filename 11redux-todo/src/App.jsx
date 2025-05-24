import store from "./app/store";
import { Provider } from "react-redux";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <Provider store={store}>
      <h1>Learning About redux toolkit</h1>
      <AddTodo />
      <Todos />
    </Provider>
  );
}

export default App;
