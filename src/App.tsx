/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "react-error-boundary";
import { Navigation } from "./navigation/Navigation";
import { ErrorFallback } from "@components/ErrorFallback";
import { OfflineGate } from "@components/OfflineGate";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <OfflineGate>
          <Navigation />
        </OfflineGate>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
