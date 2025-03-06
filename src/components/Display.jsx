import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  TextInput,
  Dimensions,
  useColorScheme
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { useCalculator } from "../../context/calculatorContext";
import { lightTheme, darkTheme } from "../../constants/theme";

const { height, width } = Dimensions.get("window");
const displayHeight = Math.floor((34 / 100) * height);

export default function Display() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { state } = useCalculator();
  const { theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const currentTheme = useColorScheme();

  useEffect(() => setIsEnabled(theme === "dark"), [theme]);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        theme === "dark" && darkStyles.container
      ]}
    >
      <View style={styles.toggleSwitch}>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.prevOperand}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.prevOperandText, theme === "dark" && darkStyles.text]}
          >
            {state.prevOperand}
            {state.operator}
          </Text>
        </View>
        <View style={styles.currentOperand}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.currentOperandText, theme === "dark" && darkStyles.text]}
          >
            {state.currentOperand}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: displayHeight,
    backgroundColor: lightTheme.display,
    alignItems: "center",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18
  },
  toggleSwitch: {
    width: "100%"
  },
  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  prevOperand: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  currentOperand: {
    flex: 2,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  prevOperandText: {
    fontSize: 48
  },
  currentOperandText: {
    fontSize: 86
  }
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.display
  },
  text: {
    color: darkTheme.displayText
  }
});
