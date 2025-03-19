import React from "react";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../constants/theme";

const width = Math.floor(Dimensions.get("screen").width / 4);

export default function Button({ value, onPress, spanTwo, operator, allClear }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        spanTwo && styles.spanTwo,
        operator && styles.operator,
        allClear && styles.allClear,
        theme === "dark" && darkStyles.button,
        theme === "dark" && operator && darkStyles.operator,
        theme === "dark" && allClear && darkStyles.allClear,
        { opacity: pressed ? 0.5 : 1 }
      ]}
    >
      <Text style={[styles.text, theme === "dark" && darkStyles.text]}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width - 25,
    height: width - 25,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: lightTheme.button
  },
  text: {
    color: "#333",
    fontSize: 28,
    fontWeight: 600,
    textAlign: "center"
  },
  spanTwo: {
    width: width * 2 - 25
  },
  operator: {
    backgroundColor: lightTheme.operator
  },
  allClear: {
    backgroundColor: lightTheme.allClear
  }
});

const darkStyles = StyleSheet.create({
  button: {
    backgroundColor: darkTheme.button
  },
  text: {
    color: darkTheme.buttonText
  },
  operator: {
    backgroundColor: darkTheme.operator
  },
  allClear: {
    backgroundColor: darkTheme.allClear
  }
});
