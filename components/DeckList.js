import React, { Component } from "react";

import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import { lightPurp } from "../utils/colors";
import Deck from "./Deck";

const Item = ({ deck }) => (
  <TouchableOpacity style={styles.item}>
    <Deck deckId={deck} />
    {/* <Text style={styles.title}>{title}</Text> */}
  </TouchableOpacity>
);

class AddDeck extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  renderItem = ({ item }) => <Item deck={item.title} />;
  render() {
    const DATA = Object.values(this.props.decks);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: lightPurp,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps, { handleInitialData })(AddDeck);
