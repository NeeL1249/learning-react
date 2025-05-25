import "./App.css";
import RegisterPage from "./components/RegisterPage";
import store from "./app/store";
import { Provider } from "react-redux";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Provider store={store}>
      {/* <RegisterPage /> */}
      <LoginPage />
    </Provider>
  );
}

export default App;
