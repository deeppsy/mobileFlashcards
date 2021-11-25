import React, { Component } from "react";

import { View, Text } from "react-native";
import { connect } from "react-redux";

class AddDeck extends Component {
  render() {
    return (
      <View>
        <Text>Add Deck</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(AddDeck);
