import { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import CalculatorScreen from "./src/screens/CalculatorScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/ThemeContext";
import CalculatorProvider from "./context/calculatorContext";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const onLayoutRootView = useCallback(() => {
    if (!isAppReady) {
      setIsAppReady(true);
      SplashScreen.hide();
    }
  }, [isAppReady]);

  return (
    <SafeAreaProvider>
      <CalculatorProvider>
        <ThemeProvider>
          <View onLayout={onLayoutRootView} style={styles.container}>
            <CalculatorScreen />
          </View>
        </ThemeProvider>
      </CalculatorProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
