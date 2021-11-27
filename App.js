import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import Setting from "./components/Setting";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import DeckDetail from "./components/DeckDetail";
import reducer from "./reducers";
import applyMiddleware from "./middlewares";
import { colors } from "./utils/colors";
import { setLocalNotification } from "./utils/helpers";
import { createStackNavigator } from "@react-navigation/stack";

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
      title: "Home",
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

  Setting: {
    component: Setting,
    name: "Setting",
    options: {
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="setting" size={size} color={color} />
      ),
      title: "Setting",
    },
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  initialRouteName: "DeckList",
  backBehavior: "history",
  headerShown: false,
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

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs["DeckList"]} />
    <Tab.Screen {...RouteConfigs["AddDeck"]} />
    <Tab.Screen {...RouteConfigs["Setting"]} />
  </Tab.Navigator>
);

// Config for StackNav
const StackNavigatorConfig = {
  screenOptions: {
    headerMode: "screen",
  },
};
const StackConfig = {
  TabNav: {
    name: "Home",
    component: TabNav,
    options: { headerShown: false },
  },
  DeckDetail: {
    name: "DeckDetail",
    component: DeckDetail,
    options: {
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: colors.backgroundColors.BabyPowder,
      },
      headerTitleStyle: { width: Dimensions.get("window").width },
      title: "Deck Detail",
    },
  },

  Quiz: {
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: colors.backgroundColors.BabyPowder,
      },
      headerTitleStyle: { width: Dimensions.get("window").width },
      title: "Quiz",
    },
  },
  AddCard: {
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: colors.backgroundColors.BabyPowder,
      },
      headerTitleStyle: { width: Dimensions.get("window").width },
      title: "Add Card",
    },
  },
};

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig["TabNav"]} />
    <Stack.Screen {...StackConfig["DeckDetail"]} />
    <Stack.Screen {...StackConfig["AddCard"]} />
    <Stack.Screen {...StackConfig["Quiz"]} />
  </Stack.Navigator>
);

class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

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
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

export default App;
