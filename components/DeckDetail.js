import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import MyButton from "./Button";

class DeckDetail extends React.Component {
  componentDidMount() {
    const { title } = this.props.route.params;

    this.setTitle(title);
  }

  setTitle = (title) => {
    if (!title) return;
    this.props.navigation.setOptions({
      title,
    });
  };

  render() {
    const { navigation } = this.props;
    const { title, questionsNum } = this.props.route.params;

    const noOfQuestions = this.props.decks[title].questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckSubTitle}>
          {noOfQuestions} {noOfQuestions === 1 ? "card" : "cards"}
        </Text>
        <MyButton
          color={"black"}
          title="Add Card"
          outline
          onPress={() => {
            navigation.navigate("AddCard", {
              title,
            });
          }}
        />
        <MyButton
          color={"black"}
          title="Start Quiz"
          onPress={() => {
            navigation.navigate("Quiz", {
              title,
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  deckTitle: {
    fontSize: 30,
    textAlign: "center",

    paddingTop: 80,
  },
  deckSubTitle: {
    fontSize: 20,
    textAlign: "center",

    paddingBottom: 60,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(DeckDetail);
