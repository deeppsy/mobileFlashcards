import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors } from "../utils/colors";

class Deck extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam("title", "Deck"),
  //   };
  // };

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
    borderColor: "pink",
    borderWidth: 5,

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
