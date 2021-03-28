import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";

import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
