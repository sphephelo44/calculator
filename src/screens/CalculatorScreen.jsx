import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  ScrollView,
  AppState,
  Appearance
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useCalculator } from "../../context/calculatorContext";
import { StatusBar } from "expo-status-bar";
import Display from "../components/Display";
import Button from "../components/Button";
import { lightTheme, darkTheme } from "../../constants/theme";

export default function CalculatorScreen() {
  const { state, dispatch } = useCalculator();
  const { theme, setTheme } = useTheme();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      const systemTheme = Appearance.getColorScheme();

      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        setTheme(currentTheme => {
          if (currentTheme !== systemTheme) {
            return currentTheme === "light" ? "dark" : "light";
          }

          return currentTheme;
        });
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={[styles.container, theme === "dark" && darkStyles.container]}>
      <Display />
      <View style={styles.buttonsView}>
        <View style={styles.row}>
          <Button value="AC" onPress={() => dispatch({ type: "allClear" })} spanTwo allClear />
          <Button value="DEL" onPress={() => dispatch({ type: "delete" })} />
          <Button value="÷" onPress={() => dispatch({ type: "operator", payload: "÷" })} operator />
        </View>

        <View style={styles.row}>
          <Button value="7" onPress={() => dispatch({ type: "appendDigit", payload: "7" })} />
          <Button value="8" onPress={() => dispatch({ type: "appendDigit", payload: "8" })} />
          <Button value="9" onPress={() => dispatch({ type: "appendDigit", payload: "9" })} />
          <Button value="×" onPress={() => dispatch({ type: "operator", payload: "×" })} operator />
        </View>

        <View style={styles.row}>
          <Button value="4" onPress={() => dispatch({ type: "appendDigit", payload: "4" })} />
          <Button value="5" onPress={() => dispatch({ type: "appendDigit", payload: "5" })} />
          <Button value="6" onPress={() => dispatch({ type: "appendDigit", payload: "6" })} />
          <Button value="-" onPress={() => dispatch({ type: "operator", payload: "-" })} operator />
        </View>

        <View style={styles.row}>
          <Button value="1" onPress={() => dispatch({ type: "appendDigit", payload: "1" })} />
          <Button value="2" onPress={() => dispatch({ type: "appendDigit", payload: "2" })} />
          <Button value="3" onPress={() => dispatch({ type: "appendDigit", payload: "3" })} />
          <Button value="+" onPress={() => dispatch({ type: "operator", payload: "+" })} operator />
        </View>

        <View style={styles.row}>
          <Button value="0" onPress={() => dispatch({ type: "appendDigit", payload: "0" })} />
          <Button value="." onPress={() => dispatch({ type: "appendDigit", payload: "." })} />
          <Button value="=" onPress={() => dispatch({ type: "equals" })} spanTwo operator />
        </View>
      </View>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.background
  },
  buttonsView: {
    flex: 1,
    marginTop: 0,
    paddingTop: 32,
    gap: 21,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.background
  }
});
