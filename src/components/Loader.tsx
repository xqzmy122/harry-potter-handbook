import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

export function Loader({ text }: { text: string }) {
  const { theme } = useTheme();

  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={theme.accent} />
      <Text style={[styles.text, { color: theme.textSecondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
  },
});
