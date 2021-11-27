import React, { Component } from "react";

import { View, Text } from "react-native";
import { connect } from "react-redux";

class Quiz extends Component {
  componentDidMount() {
    const { title } = this.props.route.params;

    this.setTitle(title);
  }

  setTitle = (title) => {
    if (!title) return;
    title = title.toLowerCase();
    this.props.navigation.setOptions({
      title: `Quiz for ${title}`,
    });
  };

  render() {
    const { title } = this.props.route.params;
    const deck = this.props.decks[title];

    if (deck.questions.length === 0) {
      return (
        <View>
          <Text>
            No cards under the deck {title}, Try adding some new ones to begin
            quiz!{" "}
          </Text>
        </View>
      );
    }

    return (
      <View>
        <Text>{JSON.stringify(deck)}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(Quiz);
