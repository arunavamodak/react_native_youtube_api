import React from "react";
import Home from "./components/Home";

import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

export default function App() {
  return (
    //Provide the store to the whole app
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
