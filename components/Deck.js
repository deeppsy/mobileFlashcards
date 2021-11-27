import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors } from "../utils/colors";

class Deck extends Component {
  render() {
    const { title, questionsNum } = this.props;

    return (
      <View style={styles.deckContainer}>
        <View>
          <Text style={styles.deckText}>{title}</Text>
        </View>

        {questionsNum === 0 && (
          <View>
            <Text style={styles.cardText}>{"No cards created yet!"}</Text>
          </View>
        )}

        {questionsNum > 0 && (
          <View>
            <Text style={styles.cardText}>
              {questionsNum === 1
                ? `${questionsNum} card`
                : `${questionsNum} cards`}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColors.MaximumBluePurple,
    margin: 20,
    borderRadius: 20,
  },
  deckText: {
    fontSize: 28,
    color: colors.foregroundColors.green,
    padding: 10,
  },
  cardText: {
    fontSize: 18,
    color: colors.foregroundColors.lemonMeringue,
  },
});

function mapStateToProps(state, { title }) {
  const deck = state[title];

  return { deck };
}

export default connect(mapStateToProps)(Deck);
