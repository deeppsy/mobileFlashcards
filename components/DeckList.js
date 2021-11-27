import React, { Component } from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import { colors } from "../utils/colors";
import Deck from "./Deck";

class AddDeck extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { decks, navigation } = this.props;
    const DATA = Object.values(this.props.decks);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        {decks &&
          DATA.map((newDeck) => {
            const deck = decks[newDeck["title"]];

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DeckDetail", {
                    title: deck.title,
                  });
                }}
                key={deck.title}
              >
                <Deck
                  title={deck.title}
                  questionsNum={deck.questions.length}
                  key={deck.title}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },

  title: {
    fontSize: 32,
    textAlign: "center",
    color: colors.foregroundColors.maximumRed,
    marginVertical: 10,
    padding: 5,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps, { handleInitialData })(AddDeck);
