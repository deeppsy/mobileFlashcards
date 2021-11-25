import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors } from "../utils/colors";

class Deck extends Component {
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.deckContainer}>
        <View>
          <Text style={styles.deckText}>{deck.title}</Text>
        </View>
        <View>
          <Text style={styles.cardText}>
            {deck.questions.length && deck.questions.length === 1
              ? `${deck.questions.length} card`
              : `${deck.questions.length} cards`}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
  },
  deckText: {
    fontSize: 28,
    color: "green",
  },
  cardText: {
    fontSize: 18,
    color: colors.foregroundColors.orange,
  },
});

function mapStateToProps(state, { deckId }) {
  const deck = state[deckId];
  return { deck };
}

export default connect(mapStateToProps)(Deck);
