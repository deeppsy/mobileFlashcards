import React, { Component } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../actions";
import { addCardToDeckDB } from "../utils/api";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  componentDidMount() {
    const { title } = this.props.route.params;
    console.log(title);
    this.setTitle(title);
  }

  setTitle = (title) => {
    if (!title) return;
    this.props.navigation.setOptions({
      title: `Add new card to ${title}`,
    });
  };

  handleSubmit = () => {
    const { title: deckId } = this.props.route.params;

    const { dispatch } = this.props;

    dispatch(addCardToDeck(deckId, this.state));
    addCardToDeckDB(deckId, this.state);

    //TODO: navigate to home
    this.setState({ question: "", answer: "" });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Enter the Question and Answer.</Text>
            <View>
              <TextInput
                placeholder="Question"
                style={styles.textInput}
                value={this.state.question}
                onChangeText={(question) => this.setState({ question })}
                autoCapitalize="words"
                autoFocus={true}
              />
            </View>

            <View>
              <TextInput
                placeholder="Answer"
                style={styles.textInput}
                value={this.state.answer}
                onChangeText={(answer) => this.setState({ answer })}
                autoCapitalize="words"
                autoFocus={true}
                onSubmitEditing={this.handleSubmit}
              />
            </View>

            <View style={styles.btnContainer}>
              <Button
                title="Submit"
                onPress={this.handleSubmit}
                disabled={!this.state.question || !this.state.answer}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(AddCard);
