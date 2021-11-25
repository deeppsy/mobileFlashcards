import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import AddDeck from "./components/AddDeck";

import reducer from "./reducers";
import { purple } from "./utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

class App extends Component {
  render() {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light" />
          <AddDeck />
        </View>
      </Provider>
    );
  }
}

export default App;
