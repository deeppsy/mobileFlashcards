import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import DeckList from "./components/DeckList";

import reducer from "./reducers";
import applyMiddleware from "./middlewares";
import { colors } from "./utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

class App extends Component {
  render() {
    const store = createStore(reducer, applyMiddleware);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar
            backgroundColor={colors.backgroundColors.DeepChampagne}
            barStyle="light"
          />
          <DeckList />
        </View>
      </Provider>
    );
  }
}

export default App;
