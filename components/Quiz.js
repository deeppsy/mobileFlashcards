import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import MyButton from "./Button";
import { colors } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

import { connect } from "react-redux";

class Quiz extends Component {
  state = {
    title: null,
    currentQuestion: 0,
    viewFront: true,
    totalCorrect: 0,
    questions: [],
  };

  flipCard = () => {
    this.setState((prevState) => ({
      viewFront: !prevState.viewFront,
    }));
  };

  correct = () => {
    this.setState((prevState) => ({
      totalCorrect: prevState.totalCorrect + 1,
      currentQuestion: prevState.currentQuestion + 1,
      viewFront: true,
    }));
  };

  incorrect = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      viewFront: true,
    }));
  };

  componentDidMount() {
    const { title } = this.props.route.params;
    const deck = this.props.decks[title];

    this.setTitle(title);
    this.setState({
      title,
      questions: deck.questions,
    });
  }

  setTitle = (title) => {
    if (!title) return;
    title = title.toLowerCase();
    this.props.navigation.setOptions({
      title: `Quiz for ${title}`,
    });
  };

  render() {
    const { questions, currentQuestion, viewFront, totalCorrect, title } =
      this.state;
    const { navigation } = this.props;

    if (questions.length && currentQuestion === questions.length) {
      clearLocalNotification().then(setLocalNotification());
      //display quiz results
      return (
        <View style={styles.container}>
          <Text
            style={[styles.question, { color: colors.foregroundColors.green }]}
          >
            You got {totalCorrect} out of {questions.length} questions right!
          </Text>

          <Text
            style={[
              styles.question,
              { color: colors.foregroundColors.lemonMeringue },
            ]}
          >
            Your percentage was
            {Math.round((totalCorrect / questions.length) * 100)}%
          </Text>
          <MyButton
            bg={colors.foregroundColors.blue}
            title="Back to Deck?"
            textColor="white"
            onPress={() => {
              /* Navigate to the Deck route with params */
              navigation.navigate("DeckDetail", {
                title,
              });
            }}
          />
          <MyButton
            bg={colors.foregroundColors.green}
            title="Restart Quiz"
            textColor="white"
            onPress={() => {
              this.setState({
                currentQuestion: 0,
                viewFront: true,
                totalCorrect: 0,
              });
            }}
          />
        </View>
      );
    }

    //display question
    return (
      <View style={styles.container}>
        {questions.length ? (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.count}>
              {currentQuestion + 1} / {questions.length}
            </Text>
            <Text style={styles.question}>
              {viewFront
                ? `Q${currentQuestion + 1}: ${
                    questions[currentQuestion].question
                  }`
                : `A${currentQuestion + 1}: ${
                    questions[currentQuestion].answer
                  }`}
            </Text>

            <Button
              color={colors.backgroundColors.red}
              title={viewFront ? "Show Answer?" : " Show Question?"}
              onPress={this.flipCard}
            />
            <MyButton
              bg={colors.foregroundColors.green}
              title="Correct"
              onPress={this.correct}
              textColor="white"
            />
            <MyButton
              bg={colors.backgroundColors.red}
              title="Incorrect"
              onPress={this.incorrect}
              textColor="white"
            />
          </ScrollView>
        ) : (
          <Text style={styles.question}>This deck has no questions</Text>
        )}
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
  contentContainer: {
    alignItems: "center",
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    color: "blue",
    margin: 20,
  },
  count: {
    fontSize: 20,
    textAlign: "center",
    color: colors.foregroundColors.russianViolet,
    margin: 20,
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(Quiz);
