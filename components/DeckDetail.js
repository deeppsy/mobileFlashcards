import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Button from "./Button";
import { removeDeck } from "../actions";
import { removeDeckFromDB } from "../utils/api";
import { colors } from "../utils/colors";

class DeckDetail extends React.Component {
  componentDidMount() {
    const { title } = this.props.route.params;

    this.setTitle(title);
  }
  shouldComponentUpdate(nextProps) {
    // To make sure the deck doesn't re render when the item gets deleted
    const { title } = this.props.route.params;

    // return false;
    return nextProps.decks[title] !== undefined;
  }

  setTitle = (title) => {
    if (!title) return;
    this.props.navigation.setOptions({
      title,
    });
  };

  render() {
    const { navigation } = this.props;
    const { title } = this.props.route.params;

    const noOfQuestions = this.props.decks[title].questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckSubTitle}>
          {noOfQuestions} {noOfQuestions === 1 ? "card" : "cards"}
        </Text>
        <Button
          textColor="white"
          title="Add Card"
          bg="blue"
          onPress={() => {
            navigation.navigate("AddCard", {
              title,
            });
          }}
        />
        <Button
          textColor="white"
          bg="green"
          title="Start Quiz"
          onPress={() => {
            navigation.navigate("Quiz", {
              title,
            });
          }}
        />

        <Button
          textColor="white"
          bg="red"
          title="Delete Deck?"
          onPress={() => {
            navigation.navigate("Home");
            this.props.dispatch(removeDeck(title));
            removeDeckFromDB(title);
            alert("Deck deleted successfully");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColors.MaximumBluePurple,
    margin: 50,
    borderRadius: 20,

    alignItems: "center",
  },
  deckTitle: {
    fontSize: 50,
    textAlign: "center",
    color: colors.foregroundColors.green,

    paddingTop: 80,
  },
  deckSubTitle: {
    fontSize: 20,
    textAlign: "center",
    color: colors.foregroundColors.lemonMeringue,

    paddingBottom: 60,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(DeckDetail);
