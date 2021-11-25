import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    const { deck } = this.props;
    return (
      <View>
        <View>
          <Text>{deck.title}</Text>
        </View>
        <View>
          <Text>
            {deck.questions.length && deck.questions.length === 1
              ? `${deck.questions.length} card`
              : `${deck.questions.length} cards`}
          </Text>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state, { deckId }) {
  const deck = state[deckId];
  return { deck };
}

export default connect(mapStateToProps)(Deck);
