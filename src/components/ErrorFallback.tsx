import { View, Text, StyleSheet, Pressable } from "react-native";
import { FallbackProps } from "react-error-boundary";
import { useTheme } from "@/theme/ThemeContext";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Something went wrong</Text>
      <Text style={[styles.message, { color: theme.textSecondary }]}>{error.message}</Text>
      <Pressable
        style={[styles.button, { backgroundColor: theme.text }]}
        onPress={resetErrorBoundary}
      >
        <Text style={[styles.buttonText, { color: theme.surface }]}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
