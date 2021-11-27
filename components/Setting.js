import React, { Component } from "react";
import { connect } from "react-redux";
import { resetStore } from "../actions";
import { resetDecks } from "../utils/api";

import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

class Setting extends Component {
  onPress = () => {
    this.props.dispatch(resetStore());

    resetDecks();
    alert("Your App is back to original");
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Reset App to Initial State?</Text>
        </View>
        <View>
          <Button
            textColor="white"
            bg="red"
            onPress={this.onPress}
            title="Reset"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(Setting);
