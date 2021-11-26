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
import { addDeck } from "../actions";
import { saveDeckTitleToDB } from "../utils/api";

class AddDeck extends Component {
  state = {
    text: "",
  };

  handleChange = (newText) => {
    this.setState(() => ({
      text: newText,
    }));
  };

  handleSubmit = () => {
    const { text } = this.state;
    const { dispatch } = this.props;
    dispatch(addDeck(text));
    saveDeckTitleToDB(text);

    //TODO: navigate to home
    this.setState({ text: "" });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>
              What is the title of your new deck?
            </Text>
            <TextInput
              placeholder="Deck Title"
              style={styles.textInput}
              value={this.state.text}
              onChangeText={(newText) => this.handleChange(newText)}
              onSubmitEditing={this.handleSubmit}
              autoCapitalize="words"
              autoFocus={true}
            />
            <View style={styles.btnContainer}>
              <Button
                title="Submit"
                onPress={this.handleSubmit}
                disabled={!this.state.text}
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
    justifyContent: "flex-start",
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
    state,
  };
}

export default connect(mapStateToProps)(AddDeck);
