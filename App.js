import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { getDecksFromDB, getDeckFromDB } from "./utils/api";

export default class App extends Component {
  state = {
    text: "",
  };

  getDecks = () => {
    this.setState(() => ({
      text: getDecksFromDB(),
    }));
  };
  getDeck = (id) => {
    this.setState(() => ({
      text: getDeckFromDB(id),
    }));
  };
  saveDeckTitle = () => {};
  addCardToDeck = () => {};
  resetDeck = () => {
    this.setState({
      text: "",
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}>
          <TouchableOpacity style={styles.button} onPress={this.getDecks}>
            <Text>getDecks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.getDeck("React")}
          >
            <Text>getDeck</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text>saveDeckTitle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text>addCardToDeck</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.resetDeck}>
            <Text>Reset Text</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{JSON.stringify(this.state.text)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  space: {
    flex: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    margin: 10,
    padding: 10,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "blue",
  },
});
