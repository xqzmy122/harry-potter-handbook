/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider, useTheme } from "@/theme/ThemeContext";
import { Navigation } from "./navigation/Navigation";
import { ErrorFallback } from "@components/ErrorFallback";
import { OfflineGate } from "@components/OfflineGate";
import BootSplash from "react-native-bootsplash";
import { useEffect } from "react";

function AppContent() {
  const { isDark } = useTheme();

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <OfflineGate>
          <Navigation />
        </OfflineGate>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
