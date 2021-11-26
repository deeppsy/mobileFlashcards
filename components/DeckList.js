import React, { Component } from "react";

import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import { colors } from "../utils/colors";
import Deck from "./Deck";

// const Item = ({ deck }) => (
//   <TouchableOpacity style={styles.item}>
//     <Deck deckId={deck} />
//   </TouchableOpacity>
// );

class AddDeck extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  // renderItem = ({ item }) => <Item deck={item.title} />;
  render() {
    const { decks, navigation } = this.props;
    const DATA = Object.values(this.props.decks);

    return (
      <ScrollView>
        {decks &&
          DATA.map((newDeck) => {
            const deck = decks[newDeck["title"]];

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DeckDetail", {
                    title: deck.title,
                    questionsNum: deck.questions.length,
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

    // return (
    //   <SafeAreaView style={styles.container}>
    //     <Text style={styles.title}>Mobile FlashCards</Text>
    //     <FlatList
    //       data={DATA}
    //       renderItem={this.renderItem}
    //       keyExtractor={(item) => item.title}
    //     />
    //   </SafeAreaView>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  item: {
    backgroundColor: colors.backgroundColors.TeaGreen,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    color: colors.foregroundColors.maximumRed,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps, { handleInitialData })(AddDeck);
