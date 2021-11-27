import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class Button extends React.Component {
  render() {
    const { textColor, onPress, title, bg } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: bg }]}
        onPress={onPress}
      >
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    padding: 10,
    borderRadius: 30,
    width: 250,
  },

  text: {
    textAlign: "center",
    fontSize: 15,
  },
});

export default Button;
