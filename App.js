import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";

import reducer from "./reducers";
import applyMiddleware from "./middlewares";
import { colors, purple, white } from "./utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const RouteConfigs = {
  DeckList: {
    name: "DeckList",
    component: DeckList,
    options: {
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" size={size} color={color} />
      ),
      title: "Decks",
    },
  },
  AddDeck: {
    component: AddDeck,
    name: "Add Deck",
    options: {
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="add-circle-outline" size={size} color={color} />
      ),
      title: "Add Deck",
    },
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  initialRouteName: "DeckList",
  backBehavior: "history",
  screenOptions: {
    tabBarActiveTintColor: colors.foregroundColors.maximumRed,
    tabBarInactiveTintColor: "black",
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      height: 56,
      backgroundColor: colors.backgroundColors.BabyPowder,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tab = createBottomTabNavigator();

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

          <NavigationContainer>
            <Tab.Navigator {...TabNavigatorConfig}>
              <Tab.Screen {...RouteConfigs["DeckList"]} />
              <Tab.Screen {...RouteConfigs["AddDeck"]} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

export default App;
